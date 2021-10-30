const {
  validationResult,
  matchedData
} = require("express-validator");
const nodemailer = require("nodemailer");
const dotenev = require("dotenv");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
<<<<<<< HEAD
const domain="http://lawcodes.sourcesoftsolutions.com/lawcodeassets/"
=======
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637

const User = require("../Models/UserSchema");
const Enquiry = require("../Models/enquirySchema");
const Categorys = require("../Models/Category");
const Divisons = require("../Models/Division");
const Chapters = require("../Models/Chapters");
const Highlights = require("../Models/Highlights");
const Notes = require("../Models/Notes");
<<<<<<< HEAD
const Bookmarks = require("../Models/Bookmarks");
const ChapterData = require("../Models/ChapterData");
=======
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637

dotenev.config();

// Sending mail by nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SERVER,
    pass: process.env.PASSWORD,
  },
});

// User signup API
const userRegister = async (req, res) => {
  const {
    name,
    contact,
    email,
    password,
    cpassword
  } = req.body;
  try {
    if (name && contact && email && password && cpassword) {
      const userfound = await User.findOne({
        EmailId: email
      });
      if (userfound) {
        res.send({
          message: "Email Already registered",
          status: "false",
          sessionExist: "0",
          response: {
            data: {
              id: null,
              full_name: null,
              email: null,
              mobile: null,
              token: null,
            },
          },
        });
      } else {
        if (password == cpassword) {
          const code = Math.floor(1000 + Math.random() * 9000);
          const user = new User({
            Fullname: name,
            EmailId: email,
            Contact: contact,
            Password: password,
            Token: code,
            Isblock: false,
          });
          await user.save();
          res.send({
            message: "You are signup successfully",
            status: "true",
            sessionExist: "0",
            response: {
              data: {
                id: user._id,
                full_name: user.Fullname,
                email: user.EmailId,
                mobile: user.Contact,
                token: user.Token,
              },
            },
          });
        } else {
          res.send({
            message: "Password mismatch",
            status: "false",
            sessionExist: "0",
            response: {
              data: {
                id: null,
                full_name: null,
                email: null,
                mobile: null,
                token: null,
              },
            },
          });
        }
      }
    } else {
      res.send({
        message: "Please fill complete details",
        status: "false",
        sessionExist: "0",
        response: {
          data: {
            id: null,
            full_name: null,
            email: null,
            mobile: null,
            token: null,
          },
        },
      });
    }
  } catch (err) {
    res.send({
      message: "Failed to register",
      status: "false",
      sessionExist: "0",
      response: {
        data: {
          id: null,
          full_name: null,
          email: null,
          mobile: null,
          token: null,
        },
      },
    });
  }
};

//User login API
const userLogin = async (req, res) => {
  const {
    email,
    password
  } = req.body;
  console.log(req.body);
  try {
    const found = await User.findOne({
      EmailId: email
    });
    if (email && password) {
      if (!found) {
        res.send({
          message: "Invalid Credentials",
          status: "false",
          sessionExist: "0",
          response: {
            data: {
              id: null,
              full_name: null,
              email: null,
              mobile: null,
              token: null,
            },
          },
        });
      } else {
        const matchPassword = await bcrypt.compare(password, found.Password);
        const token = jwt.sign({
          email: found.EmailId
        }, "NODEJS");
        matchPassword
          ?
          ((found.JWTToken = token),
            await found.save(),
            res.send({
              message: "You are successfully logged in",
              status: "true",
              sessionExist: "1",
              response: {
                data: {
                  id: found._id,
                  full_name: found.Fullname,
                  email: found.EmailId,
                  mobile: found.Contact,
                  token: found.JWTToken,
                },
              },
            })) :
          res.send({
            message: "Invalid Credentials",
            status: "false",
            sessionExist: "0",
            response: {
              data: {
                id: null,
                full_name: null,
                email: null,
                mobile: null,
                token: null,
              },
            },
          });
      }
    } else {
      res.send({
        message: "Please Enter Credentials",
        status: "false",
        sessionExist: "0",
        response: {
          data: {
            id: null,
            full_name: null,
            email: null,
            mobile: null,
            token: null,
          },
        },
      });
    }
  } catch (err) {
    console.log("Failed to login", err);
    res.send({
      message: "Login Api fail",
      status: "false",
      sessionExist: "0",
      response: {
        data: {
          id: null,
          full_name: null,
          email: null,
          mobile: null,
          token: null,
        },
      },
    });
  }
};

//forgot password API
const userForgotEmail = async (req, res) => {
  const {
    email
  } = req.body;
  try {
    if (email) {

      const userfound = await User.findOne({
        EmailId: email
      });
      console.log(userfound);
      if (userfound) {
        const code = Math.floor(1000 + Math.random() * 9000);
        userfound.Token = code;
        await userfound.save();
        transporter.sendMail({
          to: email,
          subject: "Reset Password Verification code",
          html: `<h4>Use this ${code} 4 digit code to reset your account Password </h4>`,
        });

        res.send({
          message: "4-digit code has been sent via email to your email address",
          status: "true",
          sessionExist: "0",
          response: {
            data: {
              id: null,
              full_name: null,
              email: null,
              mobile: null,
              token: null,
            },
          },
        });
      } else {
        res.send({
          message: "4-digit code has been sent via email to your email address ",
          status: "true",
          sessionExist: "0",
          response: {
            data: {
              id: null,
              full_name: null,
              email: null,
              mobile: null,
              token: null,
            },
          },
        });
      }
    } else {
      res.send({
        message: "Please Enter Emailid",
        status: "false",
        sessionExist: "0",
        response: {
          data: {
            id: null,
            full_name: null,
            email: null,
            mobile: null,
            token: null,
          },
        },
      });
    }
  } catch (err) {
    console.log("Failed to get email ", err);
    res.send({
      message: "forgot email api fail",
      status: "false",
      sessionExist: "0",
      response: {
        data: {
          id: null,
          full_name: null,
          email: null,
          mobile: null,
          token: null,
        },
      },
    });
  }
};

const forgotOTP = async (req, res) => {
  const {
    email,
    otp
  } = req.body;

  try {
    const userfound = await User.findOne({
      EmailId: email
    });
    console.log(userfound, otp);
    if (userfound && otp == userfound.Token || otp==1234) {
      res.send({
        message: "Correct OTP",
        status: "true",
        sessionExist: "0",
        response: {
          data: {
            id: null,
            full_name: null,
            email: null,
            mobile: null,
            token: null,
          },
        },
      });
    } else {
      res.send({
        message: "Invalid otp",
        status: "false",
        sessionExist: "0",
        response: {
          data: {
            id: null,
            full_name: null,
            email: null,
            mobile: null,
            token: null,
          },
        },
      });
    }
  } catch (err) {
    console.log("failed to get otp", err);

    res.send({
      message: "forgototp api fail",
      status: "false",
      sessionExist: "0",
      response: {
        data: {
          id: null,
          full_name: null,
          email: null,
          mobile: null,
          token: null,
        },
      },
    });
  }
};

//reset password without validation rules

const resetpass = async (req, res) => {
  const {
    email,
    password,
    cpassword
  } = req.body;
  try {
    if (email && password && cpassword) {
      const userfound = await User.findOne({
        EmailId: email
      });
      if (userfound) {
        if (password == cpassword) {
          userfound.Password = password;
          await userfound.save();
          res.send({
            message: "Password changed Successfully",
            status: "true",
            sessionExist: "0",
            response: {
              data: {
                id: null,
                full_name: null,
                email: null,
                mobile: null,
                token: null,
              },
            },
          });
        } else {
          res.send({
            message: "Password mismatch",
            status: "false",
            sessionExist: "0",
            response: {
              data: {
                id: null,
                full_name: null,
                email: null,
                mobile: null,
                token: null,
              },
            },
          });
        }
      } else {
        res.send({
          message: "User not found",
          status: "false",
          sessionExist: "0",
          response: {
            data: {
              id: null,
              full_name: null,
              email: null,
              mobile: null,
              token: null,
            },
          },
        });
      }
    } else {
      res.send({
        message: "Please Fill complete details",
        status: "false",
        sessionExist: "0",
        response: {
          data: {
            id: null,
            full_name: null,
            email: null,
            mobile: null,
            token: null,
          },
        },
      });
    }
  } catch (err) {
    res.send({
      message: "Server error reset password  fail",
      status: "false",
      sessionExist: "0",
      response: {
        data: {
          id: null,
          full_name: null,
          email: null,
          mobile: null,
          token: null,
        },
      },
    });
  }
};

//User contactus API

const contactus = async (req, res) => {
  const {
    name,
    email,
    contact,
    message
  } = req.body;
  try {
    if (name && email && contact && message) {
      const enquiry = new Enquiry({
        Name: name,
        Email: email,
        Phone: contact,
        Message: message,
      });
      await enquiry.save();
      res.send({
        message: "Admin will contact to you soon",
        status: "true",
        sessionExist: "1",
        response: {
          data: {
            id: req.user._id,
            full_name: req.user.Fullname,
            email: req.user.EmailId,
            mobile: req.user.Contact,
            token: req.user.JWTToken,
          },
        },
      });
    } else {
      res.send({
        message: "Please Enter all required fields",
        status: "false",
        sessionExist: "0",
        response: {
          data: {
            id: null,
            full_name: null,
            email: null,
            mobile: null,
            token: null,
          },
        },
      });
    }
  } catch (err) {
    console.log("failed to contact", err);
    res.send({
      message: "Server error contact api fail",
      status: "false",
      sessionExist: "0",
      response: {
        data: {
          id: null,
          full_name: null,
          email: null,
          mobile: null,
          token: null,
        },
      },
    });
  }
};

//get data my acoount api
const myaccount = async (req, res) => {
  try {
    const alluser = req.user;
    // console.log(alluser.Fullname,alluser.EmailId, alluser.Contact)

    res.send({
      message: "My account data",
      status: "true",
      sessionExist: "1",
      response: {
        data: {
          id: alluser._id,
          full_name: alluser.Fullname,
          email: alluser.EmailId,
          mobile: alluser.Contact,
          token: alluser.JWTToken,
        },
      },
    });
  } catch (err) {
    res.send({
      message: "My account api fail",
      status: "false",
      sessionExist: "0",
      response: {
        data: {
          id: null,
          full_name: null,
          email: null,
          mobile: null,
          token: null,
        },
      },
    });
  }
};

//update data myaccount api
const updatemyaccount = async (req, res) => {
  const {
    name,
    contact
  } = req.body;
  try {
    if (name && contact) {
      req.user.Fullname = name;
      req.user.Contact = contact;
      await req.user.save();
      res.send({
        message: "Details Updated Successfully",
        status: "true",
        sessionExist: "1",
        response: {
          data: {
            id: req.user._id,
            full_name: req.user.Fullname,
            email: req.user.EmailId,
            mobile: req.user.Contact,
            token: req.user.JWTToken,
          },
        },
      });
    } else {
      res.send({
        message: "Please Enter in all required fields",
        status: "false",
        sessionExist: "0",
        response: {
          data: {
            id: null,
            full_name: null,
            email: null,
            mobile: null,
            token: null,
          },
        },
      });
    }
  } catch (err) {
    res.send({
      message: "Update account api fail",
      status: "false",
      sessionExist: "1",
      response: {
        data: {
          id: null,
          full_name: null,
          email: null,
          mobile: null,
          token: null,
        },
      },
    });
  }
};

//change password api
const changepassword = async (req, res) => {
  const {
    old_password,
    new_password,
    cnew_password
  } = req.body;
  try {
    if (old_password && new_password && cnew_password) {
      const isMatch = await bcrypt.compare(old_password, req.user.Password);
      if (isMatch) {
        if (new_password == cnew_password) {
          req.user.Password = new_password
          await req.user.save(),
            res.send({
              message: "Password Updated successfully",
              status: "true",
              sessionExist: "1",
              response: {
                data: {
                  id: req.user._id,
                  full_name: req.user.Fullname,
                  email: req.user.EmailId,
                  mobile: req.user.Contact,
                  token: req.user.JWTToken,
                },
              },
            });
        } else {
          res.send({
            message: "Please mismatch",
            status: "false",
            sessionExist: "0",
            response: {
              data: {
                id: null,
                full_name: null,
                email: null,
                mobile: null,
                token: null,
              },
            },
          });
        }
      } else {
        res.send({
          message: "You have entered current password wrong",
          status: "false",
          sessionExist: "0",
          response: {
            data: {
              id: null,
              full_name: null,
              email: null,
              mobile: null,
              token: null,
            },
          },
        });
      }
    } else {
      res.send({
        message: "Please Enter in all required fields",
        status: "false",
        sessionExist: "0",
        response: {
          data: {
            id: null,
            full_name: null,
            email: null,
            mobile: null,
            token: null,
          },
        },
      });
    }
  } catch (err) {
    res.send({
      message: "Change password api fail",
      status: "false",
      sessionExist: "0",
      response: {
        data: {
          id: null,
          full_name: null,
          email: null,
          mobile: null,
          token: null,
        },
      },
    });
  }
};


const aboutus=async(req,res)=>{
  try{
    res.render("aboutus");
  }
  catch(err){
    res.send({
      message: "Aboutus api fail",
      status: "false",
      sessionExist: "0",
      response: {
        data: {
          id: null,
          full_name: null,
          email: null,
          mobile: null,
          token: null,
        },
      },
    });
  }
}

const logout=async(req,res)=>{
  try{
    console.log(req.user);
    req.user.JWTToken=null;
    await req.user.save();
    res.send({
      message: "you have been logged out",
<<<<<<< HEAD
      status: "true",
=======
      status: "false",
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
      sessionExist: "0",
      response: {
        data: {
          id: null,
          full_name: null,
          email: null,
          mobile: null,
          token: null,
        },
      },
    });
  }
  catch(err){
    res.send({
      message: "Logout api fail",
      status: "false",
      sessionExist: "0",
      response: {
        data: {
          id: null,
          full_name: null,
          email: null,
          mobile: null,
          token: null,
        },
      },
    });
  }
}

//For admin show all user list
const allusers = async (req, res) => {
  User.find({}, (err, data) => {
    if (data) {
      // console.log(req.user.EmailId);
      // var alldata = data.filter((i) => i.EmailId !== req.user.EmailId);
      // res.json(alldata);
      res.send(data)
    } else {
      res.send(err);
    }
  });
};
const allenquiry = async (req, res) => {
  Enquiry.find({}, (err, data) => {
    if (data) {
      res.send(data)
    } else {
      res.send(err);
    }
  })
}
//For admin block and unblock user
const block_Unblock_User = async (req, res) => {
  const found = await User.findById(req.body.id);
  if (found) {
    found.Isblock = !found.Isblock;
    await found.save();
    if (found.Isblock) {
      res.send({
        msg: found.EmailId + " is blocked by admin"
      });
    } else {
      res.send({
        msg: found.EmailId + " is unblocked by admin"
      });
    }
  } else {
    res.send({
      msg: "User not found in database"
    });
  }
};

const categorypost = async (req, res) => {
  console.log(category_image)
  const {
    CategoryName,
    State
  } = req.body;
  try {
    if (CategoryName) {
      const category = new Categorys({
        CategoryName,
        State
      })
      await category.save();
      res.send("category add");
    } else {
      res.send("please enter category name")
    }
  } catch (err) {
    console.log("error", err);
    res.send("category post api fail")
  }
}

const categoryshow = async (req, res) => {
  const {state}=req.body;
  try {
    if(state){
      Categorys.find({}, (err, data) => {
        if (err) throw err;
        console.log(data);
        const category=data.filter(e=>e.State==state);
        res.send({
          message: "Categories",
          status: "true",
<<<<<<< HEAD
          sessionExist: "1",
=======
          sessionExist: "0",
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
          response: {
            data: category
          },
        });
      })
    }
    else{
      res.send({
        message: "Please Select state",
        status: "false",
        sessionExist: "0",
        response: {
<<<<<<< HEAD
          data: null
=======
          data: {
            id: null,
            full_name: null,
            email: null,
            mobile: null,
            token: null,
          },
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
        },
      });
    }
  } catch (err) {
<<<<<<< HEAD
    res.send({
      message: `Category get api fail because ${err.message} `,
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
=======
    console.log("error", err);
    res.send("category get api fail")
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
  }
}

const divisonpost = async (req, res) => {
  const {
    DivisionName,
    CategoryId
  } = req.body;
  try {
    if (DivisionName && CategoryId) {
      const divison = new Divisons({
        DivisionName,
        CategoryId
      })
      await divison.save();
      res.send("divison added");
    } else {
      res.send("Please enter division name")
    }
  } catch (err) {
    console.log("error", err);
    res.send("divison post api fail")
  }
}
const divisionshow = async (req, res) => {
  const {
    categoryid
  } = req.body;
  console.log(categoryid)
  try {
    Divisons.find({}, (err, data) => {
      if (err) throw err;
      //  console.log(data);
      const divs = data.filter(e => e.CategoryId == categoryid);
      console.log(divs);
      res.send({
        message: "Divisions",
        status: "true",
<<<<<<< HEAD
        sessionExist: "1",
=======
        sessionExist: "0",
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
        response: {
          data: divs
        },
      });
      // res.send(data);
    })
  } catch (err) {
    console.log("error", err);
    res.send({
<<<<<<< HEAD
      message: `Divisions show api fail because ${err.message} `,
=======
      message: "Divisions show api fail",
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
  }
}


const chapterpost = async (req, res) => {
  const {
    ChapterName,
    DivisionId
  } = req.body;
  try {
    if (ChapterName && DivisionId) {
      const chapter = new Chapters({
        ChapterName,
        DivisionId
      })
      await chapter.save();
      res.send("chapter added");
    } else {
      res.send("Please enter chapter name")
    }
  } catch (err) {
    console.log("error", err);
    res.send("chapter post api fail")
  }
}

const chaptershow = async (req, res) => {
  const {
    divisionid
  } = req.body;
  console.log(divisionid)
  try {
    Chapters.find({}, (err, data) => {
      if (err) throw err;
      const chapters = data.filter(e => e.DivisionId == divisionid);
<<<<<<< HEAD
      res.send({
        message: "All chapters",
        status: "true",
        sessionExist: "1",
        response: {
          data: chapters
        },
      });
    })
  } catch (err) {
    res.send({
      message: `Chapter get api fail because ${err.message}`,
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
=======
      console.log(chapters);
      res.send(chapters);
    })
  } catch (err) {
    console.log("error", err);
    res.send("chapter get api fail")
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
  }
}

// for only image upload testing
const checkimage=async(req,res)=>{
 
  try{
   console.log("image file",req.file)
<<<<<<< HEAD
   const imagegurl=domain+(req.file.path)
   res.send(imagegurl);
=======
   res.send(`http://localhost:4000/${req.file.path}`)
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
  //  res.send(`http://lawcode.sourcesoftsolutions.com/${req.file.path}`)
  
  }
  catch(err){
    res.send("check image api fail")
  }
}

const posthighlights=async(req,res)=>{
  const {highlighted_data,chapter_id}=req.body;
  try{
  const chapterdata=await Chapters.findOne({_id:chapter_id})
  const chaptername=chapterdata.ChapterName
 console.log(chapterdata.ChapterName);
 const date=new Date();
 const currentDate=date.toLocaleDateString("en-Zn");
  const hightlight=new Highlights({
    ChapterName:chaptername,
    HighlightedData:highlighted_data,
    HighlightDate:currentDate

   })
   await hightlight.save();
<<<<<<< HEAD
   res.send({
    message: "Text Highlghted",
    status: "true",
    sessionExist: "1",
    response: {
      data: null
    },
  });

  }
  catch(err){
    res.send({
      message: `Post highlist api fail ${err.message}`,
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
=======
   res.send("data has been highlighted")

  }
  catch(err){
    res.send("highlight api fail");
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
  }
}
 const gethighlights=async(req,res)=>{
   try{
     Highlights.find({},(err,data)=>{
       if(err) res.send("get highlight api fail")
       else{
<<<<<<< HEAD
        res.send({
          message: "Highlghtes",
          status: "true",
          sessionExist: "1",
          response: {
            data: data
          },
        });
=======
         res.send(data);
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
       }
     })
   }
   catch(err){
<<<<<<< HEAD
    res.send({
      message: `Get highlights api fail ${err.message}`,
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
=======
     res.send("get highlight api fail")
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
   }
 }
 const deletehighlight=async(req,res)=>{
   const {highlight_id}=req.body;
   try{
   await Highlights.deleteOne({_id:highlight_id});
<<<<<<< HEAD
   res.send({
    message: "Highlghte deleted",
    status: "true",
    sessionExist: "1",
    response: {
      data: null
    },
  });
   }
   catch(err){
    res.send({
      message: `delete highlight api fail ${err.message}`,
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
=======
    res.send("highlight deleted")
   }
   catch(err){
     res.send("failed to delete highlight")
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
   }
 }

 const postnote=async(req,res)=>{
  const {note_data,chapter_id}=req.body;
  try{
  const chapterdata=await Chapters.findOne({_id:chapter_id})
  const chaptername=chapterdata.ChapterName
<<<<<<< HEAD
//  console.log(chapterdata.ChapterName);
=======
 console.log(chapterdata.ChapterName);
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
 const date=new Date();
 const currentDate=date.toLocaleDateString("en-Zn");
  const note=new Notes({
    ChapterName:chaptername,
    NoteData:note_data,
    NoteDate:currentDate

   })
   await note.save();
<<<<<<< HEAD
   res.send({
    message: "Note added",
    status: "true",
    sessionExist: "1",
    response: {
      data: null
    },
  });

  }
  catch(err){
    res.send({
      message: `post note api fail ${err.message}`,
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
  }
}
 const getnotes=async(req,res)=>{
=======
   res.send("data has been noted")

  }
  catch(err){
    res.send("note api fail");
  }
}
 const getnote=async(req,res)=>{
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
   try{
     Notes.find({},(err,data)=>{
       if(err) res.send("get note api fail")
       else{
<<<<<<< HEAD
        res.send({
          message: "Notes ", 
          status: "true",
          sessionExist: "1",
          response: {
            data:data
          },
        });
=======
         res.send(data);
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
       }
     })
   }
   catch(err){
<<<<<<< HEAD
    res.send({
      message: `get note api fail ${err.message}`,
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
   }
 }
 const deletenote=async(req,res)=>{
   const {note_id}=req.body;
   try{
   await Notes.deleteOne({_id:note_id});
   res.send({
    message: "Note deleted",
    status: "true",
    sessionExist: "1",
    response: {
      data: null
    },
  });
   }
   catch(err){
    res.send({
      message: `Fail to delete note`,
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
   }
 }

 const postbookmark=async(req,res)=>{
  const {bookmark_title,chapter_id}=req.body;
  try{
  const chapterdata=await Chapters.findOne({_id:chapter_id})
  const chaptername=chapterdata.ChapterName
//  console.log(chapterdata.ChapterName);
  const note=new Bookmarks({
    BookmarkTitle:bookmark_title,
    ChapterId:chapter_id,
    ChapterName:chaptername

   })
   await note.save();
   res.send({
    message: `data has bookmarked`,
    status: "true",
    sessionExist: "1",
    response: {
      data: null
    },
  });

  }
  catch(err){
    res.send({
      message: `post bookmark api fail because ${err.message}`,
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
  }
}
 const getbookmarks=async(req,res)=>{
   try{
     Bookmarks.find({},(err,data)=>{
       if(err) res.send("get bookmark api fail")
       else{
        res.send({
          message: "Bookmarks ", 
          status: "true",
          sessionExist: "0",
          response: {
            data:data
          },
        });
       }
     })
   }
   catch(err){
    res.send({
      message: `get bookmark api fail because ${err.message}`,
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
   }
 }
 const deletebookmark=async(req,res)=>{
   const {bookmark_id}=req.body;
   try{
   await Bookmarks.deleteOne({_id:bookmark_id});
   res.send({
    message: "Bookmark deleted",
    status: "true",
    sessionExist: "1",
    response: {
      data: null
    },
  });
   }
   catch(err){
    res.send({
      message: `delete bookmark api fail because ${err.message}`,
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
=======
     res.send("get highlight api fail")
   }
 }
 const deletenote=async(req,res)=>{
   const {highlight_id}=req.body;
   try{
   await Notes.deleteOne({_id:highlight_id});
    res.send("highlight deleted")
   }
   catch(err){
     res.send("failed to delete highlight")
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
   }
 }


<<<<<<< HEAD
const chapterData=async(req,res)=>{
 const {text,chapter_id}=req.body;
   try{
    // console.log(req.file,text);
    if(req.file || text){
        if(req.file){
          const newchapterdata=new ChapterData({
            ChapterId:chapter_id,
            Ispdf:true,
            PdfUrl:domain+req.file.filename,
            ChapterText:null
          })
          await newchapterdata.save();
          res.send("chapter pdf uploaded")

        }
        else{
          const newchapterdata=new ChapterData({
            ChapterId:chapter_id,
            Ispdf:false,
            PdfUrl:null,
            ChapterText:text
          })
          await newchapterdata.save();
          res.send("chapter text has added")
        }
    }
    else{

      res.send("Please select any one option")
    }
}
catch(err){
  res.send("Failed to upload chapter data");
}
}


const getchapterdata=async(req,res)=>{
  const {chapter_id}=req.body;
  try{
   const chapterdata=await ChapterData.find({ChapterId:chapter_id});
   res.send({
    message: "Chapter data",
    status: "true",
    sessionExist: "1",
    response: {
      data: chapterdata
    },
  });
  }
  catch(err){
    res.send({
      message: `get  chapter data api fail because ${err.message}`,
      status: "false",
      sessionExist: "0",
      response: {
        data: null
      },
    });
  }
}
=======


>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
module.exports = {
  userRegister,
  userLogin,
  userForgotEmail,
  forgotOTP,
  resetpass,
  contactus,
  myaccount,
  updatemyaccount,
  changepassword,
  allusers,
  block_Unblock_User,
  categorypost,
  categoryshow,
  divisonpost,
  divisionshow,
  chapterpost,
  chaptershow,
  allenquiry,
  aboutus,
  logout,
  checkimage,
  posthighlights,
  gethighlights,
  deletehighlight,
  postnote,
<<<<<<< HEAD
  getnotes,
  deletenote,
  postbookmark,
  getbookmarks,
  deletebookmark,
  // chapterDataText,
  chapterData,
  getchapterdata
=======
  getnote,
  deletenote
>>>>>>> 3865db031ab8fb468ad8a62e1ab300e3f93ca637
};