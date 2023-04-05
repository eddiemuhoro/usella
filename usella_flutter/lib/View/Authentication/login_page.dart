import 'package:flutter/gestures.dart';
import 'package:flutter/material.dart';
import 'package:usella_flutter/Util/color_constants.dart';
import 'package:usella_flutter/View/Authentication/Widgets/inputfield.dart';

class Login extends StatelessWidget {
  Login({super.key});

  final emailController = TextEditingController();
  final passwordController = TextEditingController();

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
                        "Login",
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
                        height: 20,
                      ),
                      InputField(
                       
                        controller: emailController,
                        hint: 'email',
                        errorText: "Error",
                        title: "Email",
                      ),
                      const SizedBox(
                        height: 10,
                      ),
                      InputField(
                        
                        controller: passwordController,
                        hint: 'password',
                        errorText: "Error",
                        title: "Password",
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      SizedBox(
                        width: width,
                        child: Wrap(
                          alignment: WrapAlignment.end,
                          children: [
                            Semantics(
                              button: true,
                              child: InkWell(
                                onTap: () {
                                  Navigator.pushNamed(context, '/password');
                                },
                                child: Text(
                                  "forgot password?",
                                  style: Theme.of(context)
                                      .textTheme
                                      .displayLarge!
                                      .copyWith(
                                        fontSize: 15,
                                        fontWeight: FontWeight.w500,
                                        color: primaryColor,
                                      ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      SizedBox(
                        height: 50,
                        width: width,
                        child: ElevatedButton(
                          onPressed: () {
                           if(emailController.text.isEmpty || passwordController.text.isEmpty){
                              ScaffoldMessenger.of(context).showSnackBar(
                                const SnackBar(
                                  backgroundColor: Colors.red,
                                  content: Text("Please fill all the fields"),
                                ),
                              );
                           }else{
                                                        Navigator.pushNamed(context, '/internet');

                           }
                          },
                          style: ElevatedButton.styleFrom(
                            backgroundColor: primaryColor,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(25),
                            ),
                          ),
                          child: Text(
                            "Login",
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
                      Row(
                        children: [
                          const Expanded(
                            child: Divider(
                              color: grey,
                              thickness: 0.3,
                            ),
                          ),
                          const SizedBox(
                            width: 10,
                          ),
                          Text(
                            "or",
                            style: Theme.of(context)
                                .textTheme
                                .displayLarge!
                                .copyWith(
                                  fontSize: 15,
                                  fontWeight: FontWeight.w500,
                                  color: grey,
                                ),
                          ),
                          const SizedBox(
                            width: 10,
                          ),
                          const Expanded(
                            child: Divider(
                              color: grey,
                              thickness: 0.3,
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      Center(
                        child: RichText(
                          textAlign: TextAlign.center,
                          text: TextSpan(
                              text: "Don't have an account? ",
                              style: Theme.of(context)
                                  .textTheme
                                  .displayLarge!
                                  .copyWith(
                                    fontSize: 13,
                                    fontWeight: FontWeight.w500,
                                    color: grey,
                                  ),
                              children: [
                                TextSpan(
                                  semanticsLabel: 'Sign up',
                                  recognizer: TapGestureRecognizer()
                                    ..onTap = () {
                                      Navigator.pushNamed(
                                          context, '/register');
                                    },
                                  text: "Sign up",
                                  style: Theme.of(context)
                                      .textTheme
                                      .displayLarge!
                                      .copyWith(
                                        fontSize: 13,
                                        fontWeight: FontWeight.w500,
                                        color: primaryColor,
                                      ),
                                ),
                              ]),
                        ),
                      ),
                      const SizedBox(
                        height: 20,
                      ),
                      SizedBox(
                        height: 50,
                        width: width,
                        child: ElevatedButton(
                          onPressed: () {},
                          style: ElevatedButton.styleFrom(
                            backgroundColor: Colors.red,
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(25),
                            ),
                          ),
                          child: Text(
                            "sign in with google",
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
                    ],
                  ),
                ),
              ],
            ),
          ),
        ));
  }
}
