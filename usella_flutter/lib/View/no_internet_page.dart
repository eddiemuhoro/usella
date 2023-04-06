import 'package:flutter/material.dart';
import 'package:usella_flutter/Util/color_constants.dart';

class NoInternet extends StatelessWidget {
  NoInternet({super.key});

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
              crossAxisAlignment: CrossAxisAlignment.center,
              children: [
                Container(
                  height: height * 0.7,
                  width: width,
                  constraints: BoxConstraints(maxHeight: height * 0.8),
                  child: Image.asset('lib/Assets/internet.jpg'),
                ),
                Text(
                        "No Internet connection",
                        style: Theme.of(context)
                            .textTheme
                            .displayLarge!
                            .copyWith(
                              fontSize: 18,
                              fontWeight: FontWeight.w500,
                              color: grey,
                            ),
                      ),
                const SizedBox(
                  height: 40,
                ),
                SizedBox(
                  height: 50,
                  width: width,
                  child: ElevatedButton(
                    onPressed: () {
                      if (emailController.text.isEmpty ||
                          passwordController.text.isEmpty) {
                        ScaffoldMessenger.of(context).showSnackBar(
                          const SnackBar(
                            backgroundColor: Colors.red,
                            content: Text("Please fill all the fields"),
                          ),
                        );
                      } else {
                      }
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: primaryColor,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(25),
                      ),
                    ),
                    child: Text(
                      "Try Again",
                      style: Theme.of(context).textTheme.displayLarge!.copyWith(
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
        ));
  }
}
