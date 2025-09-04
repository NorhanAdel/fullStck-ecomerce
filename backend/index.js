const port = 4000;
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const fs = require("fs");
const jwt = require("jsonwebtoken");

app.use(express.json());
app.use(cors());

mongoose
  .connect(
    "mongodb+srv://car-market:FEZaAipYmrrLFNBQ@cluster0.ea9wcmg.mongodb.net/ecomers-clothes",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number,
    required: true,
  },
  old_price: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

app.post("/addproduct", async (req, res) => {
  try {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
      let last_product_array = products.slice(-1);
      let last_product = last_product_array[0];
      id = last_product.id + 1;
    } else {
      id = 1;
    }

    const product = new Product({
      id: id,
      name: req.body.name,
      image: req.body.image,
      category: req.body.category,
      new_price: req.body.new_price,
      old_price: req.body.old_price,
    });
    await product.save();
    console.log(product);
    res.json({
      success: true,
      name: req.body.name,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});


app.get("/newCollection", async (req,res) => {
  let product = await Product.find({});
  let newCollection = await product.slice(1).slice(-8);
  console.log("new collection fetched");
  res.send(newCollection);
})

app.get("/popularinwomen", async(req,res) => {
  let product = await Product.find({ category: "women" });
  let popular_inwomen = product.slice(0,4)
  console.log("popular in women fetched")
  res.send(popular_inwomen);
})

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");  
  if (!token) {
    return res.status(401).send({ error: "Please provide a valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (err) {
      return res
        .status(401)
        .send({ error: "Please authenticate with a valid token" });
    }
  }
};

app.post("/addtocart", fetchUser, async (req, res) => {
    console.log("added", req.body.itemId);
  let userData = await User.findOne({ _id: req.user.id });
  userData.cartData[req.body.itemId] += 1;
  await User.findOneAndUpdate({ _id: req.user.id }, {  cartData:userData.cartData });
  res.send("Added");
});

app.post("/removecart", fetchUser , async (req, res) => {
  let userData = await User.findOne({ _id: req.user.id });
  console.log("removed",req.body.itemId)
  
  if (userData.cartData[req.body.itemId]>0) {
    userData.cartData[req.body.itemId] -= 1;
      await User.findOneAndUpdate(
        { _id: req.user.id },
        { cartData: userData.cartData }
      );
      res.send("Delete");
  }
   
})

app.post("getcartdata", fetchUser, async (req, res) => {
  console.log("get cart");
  let userData = await User.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});


app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  console.log("Product deleted");
  res.json({
    success: true,
    name: req.body.name
  });
});

app.get("/getallproduct", async (req, res) => {
  let products = await Product.find({});
  console.log("Products fetched");
  res.send(products);
});

app.get("/", (req, res) => {
  res.send("Running on port 4000");
});

const User = mongoose.model("User", {
  name: {
    type:  String
  },
  email: {
    type: String,
    unique:true
  },
  password: {
    type: String
  },
  cartData: {
    type:Object,
  },
  data: {
    type: Date,
    default:  Date.now,
  }
})

app.post("/register", async(req,res) => {
 try {
   // Check if the email already exists
   let check = await User.findOne({ email: req.body.email });
   if (check) {
     return res.status(400).json({ success: false, errors: "Existing email" });
   }

   // Hash the password
   const hashedPassword = await bcrypt.hash(req.body.password, 10);

   // Create a new user
   const user = new User({
     username: req.body.username, // Use 'username' instead of 'name'
     email: req.body.email,
     password: hashedPassword, // Save the hashed password
   });

   // Save the user to the database
   await user.save();

   // Create a JWT token
   const data = {
     user: {
       id: user.id,
     },
   };
   const token = jwt.sign(data, process.env.JWT_SECRET || "encom_cod");

   // Respond with the token
   res.json({ success: true, token });
 } catch (error) {
   console.error("Error during user registration:", error);
   res.status(500).json({
     success: false,
     message: "Internal Server Error",
     details: error.message,
   });
 }
})


app.post("/login", async (req,res) => {
  let user = await User.findOne({email: req.body.email})

  if (user) {
    const comparepassword = req.body.password === user.password;
    if (comparepassword) {
      const data = {
        user: {
          id: user.id,
        },
      };
       const token = jwt.sign(data, "encom_cod");
       res.json({ success: true, token });
    }else{
    return res.status(400).json({ success: false, errors: "wrong password" });

    }
  }
  else {
    return res.status(400).json({ success: false, errors: "wrong email id " });
    
}

})

 


 
const uploadDir = "./upload/images";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Image storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

app.use("/images", express.static(uploadDir));

const upload = multer({ storage: storage });

app.post("/upload", upload.single("product"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: 0, message: "No file uploaded" });
  }

  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
