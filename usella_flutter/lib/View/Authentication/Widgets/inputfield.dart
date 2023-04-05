import 'package:flutter/material.dart';
import 'package:usella_flutter/Util/color_constants.dart';

class InputField extends StatelessWidget {
  InputField({
    super.key,
    required this.controller,
    required this.hint,
    this.focusNode,
    this.enabled,
    required this.errorText,
    required this.title,

  });
  final TextEditingController controller;
  final String hint;
  final FocusNode? focusNode;
  final bool? enabled;
  final String errorText;
  final String title;


  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.start,
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.bodySmall!.copyWith(
                fontSize: 15,
                fontWeight: FontWeight.w500,
                color: grey,
              ),
        ),
        const SizedBox(
          height: 5,
        ),
        SizedBox(

          
          height: 50,
          child: TextFormField(
            
            cursorColor: primaryColor,
            controller: controller,
            focusNode: focusNode,
            enabled: enabled ?? true,
            decoration: InputDecoration(
              hintText: hint,
              fillColor: Colors.white70,
              filled: true,
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(
                  color: grey,
                  width: 0.2,
                ),
              ),
              errorBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(
                  color: Colors.red,
                  width: 0.2,
                ),
              ),
              focusedErrorBorder: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
                borderSide: const BorderSide(
                  color: primaryColor,
                  width: 0.2,
                ),
              ),
            ),
          ),
        )
      ],
    );
  }
}
