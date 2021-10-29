const express = require("express");
const requireAuth = require("../Middleware/requireAuth");
const validationRule = require("../config/validationRules");

const router = express.Router();
const controller = require("../Controllers/user.controller");
const Authorization = require("../Middleware/Authorization");
const { upload } = require("../helper/imagehelper");

router.post("/auth", requireAuth, (req, res) => {
  res.send({
    message: "You are Authorisexd user",
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
  // res.status(200).send({ msg: "You are Authorisexd user" });
});
router.post("/signup", Authorization, controller.userRegister);
router.post("/login", Authorization,controller.userLogin);
router.post("/forgot",Authorization, controller.userForgotEmail);
router.post("/forgotOTP",Authorization, controller.forgotOTP);
router.post("/resetpass",Authorization, controller.resetpass);
router.post("/myaccount", Authorization,requireAuth, controller.myaccount);
router.post("/updateaccount",Authorization,requireAuth, controller.updatemyaccount);
router.post("/changepassword",Authorization, requireAuth, controller.changepassword)


//mobile app
router.post(
  "/contactus",
  Authorization,
  requireAuth,
  controller.contactus
);

//aboutus 
router.get("/aboutus",controller.aboutus)
router.post("/logout",Authorization,requireAuth,controller.logout)

//catgories
router.post("/categorypost",controller.categorypost);
router.post("/categoryshow",Authorization,requireAuth,controller.categoryshow);

//divisons
router.post("/divisionpost",controller.divisonpost);
router.post("/divisionshow",Authorization,controller.divisionshow);

//chapters
router.post("/chapterpost",controller.chapterpost);
router.post("/chaptershow",Authorization,controller.chaptershow);



//admin panel
router.post("/getusers",requireAuth, controller.allusers);

router.post("/blUser",requireAuth,controller.block_Unblock_User);

router.post("/allenquiry", requireAuth, controller.allenquiry)

router.post("/checkimage",upload.single('file'),controller.checkimage); 

router.post("/posthighlights",controller.posthighlights)
router.post("/gethighlights",Authorization,requireAuth,controller.gethighlights);
router.delete("/deletehighlight",controller.deletehighlight);

router.post("/postnote",controller.postnote)
router.post("/getnote",controller.getnote);
router.delete("/deletenote",controller.deletenote);

module.exports = router;
