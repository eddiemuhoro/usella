import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:usella_flutter/Util/color_constants.dart';
import 'package:usella_flutter/View/Authentication/Widgets/inputfield.dart';

class ForgotPassword extends StatelessWidget {
  ForgotPassword({super.key});

  final emailController = TextEditingController();
  final passwordController = TextEditingController();
  final confirmPasswordController = TextEditingController();
  

  @override
  Widget build(BuildContext context) {
    final height = MediaQuery.of(context).size.height;
    final width = MediaQuery.of(context).size.width;
    return Scaffold(
        backgroundColor: white,
        body: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 10),
          child: SingleChildScrollView(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  height: height * 0.4,
                  width: width,
                  constraints: BoxConstraints(maxHeight: height * 0.5),
                  child: Image.asset('lib/Assets/login.jpg'),
                ),
                const SizedBox(
                  height: 10,
                ),
                Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 10.0),
                  child: Column(
                    mainAxisAlignment: MainAxisAlignment.start,
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        "Forgot Password",
                        style: Theme.of(context)
                            .textTheme
                            .displayLarge!
                            .copyWith(
                              fontSize: 25,
                              fontWeight: FontWeight.bold,
                              color: grey,
                            ),
                      ),
                      const SizedBox(
                        height: 30,
                      ),
                      InputField(
                        
                        controller: emailController,
                        hint: 'email',
                        errorText: "Error",
                        title: "Email",
                      ),
                      const SizedBox(
                        height: 15,
                      ),
                      InputField(
                        
                        controller: passwordController,
                        hint: 'password',
                        errorText: "Error",
                        title: "Password",
                      ),
                      const SizedBox(
                        height: 15,
                      ),
                      InputField(
                        
                        controller: passwordController,
                        hint: 'confirm password',
                        errorText: "Error",
                        title: "Confirm Password",
                      ),
                      const SizedBox(
                        height: 40,
                      ),
                      SizedBox(
                        height: 50,
                        width: width,
                        child: ElevatedButton(
                          onPressed: () {
                            if(emailController.text.isEmpty || passwordController.text.isEmpty || confirmPasswordController.text.isEmpty){
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  backgroundColor: Colors.red,
                                  content: Text("Please fill all the fields"),
                                ),
                              );
                           }else{
                            Navigator.pushNamed(context, '/login');
                           }
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: primaryColor,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(25),
                            ),
                          ),
                          child: Text(
                            "Save",
                            style: Theme.of(context)
                                .textTheme
                                .displayLarge!
                                .copyWith(
                                  fontSize: 17,
                                  fontWeight: FontWeight.w500,
                                  color: white,
                                ),
                          ),
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                    ],
                  ),
                ),
              ],
            ),
          ),
        ));
  }
}
