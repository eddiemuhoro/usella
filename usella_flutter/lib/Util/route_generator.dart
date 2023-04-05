import 'package:flutter/material.dart';
import 'package:usella_flutter/View/Authentication/forgot_password.dart';
import 'package:usella_flutter/View/Authentication/login_page.dart';
import 'package:usella_flutter/View/Authentication/register_page.dart';
import 'package:usella_flutter/View/Authentication/welcome_page.dart';
import 'package:usella_flutter/View/home.dart';
import 'package:usella_flutter/View/no_internet_page.dart';

class RouteGenerator {
  static Route<dynamic> generateRoute(RouteSettings settings) {
    final args = settings.arguments;

    switch (settings.name) {
      case '/':
        return MaterialPageRoute(builder: (_) => const Welcome());
      case '/home':
        return MaterialPageRoute(builder: (_) => const Home());
      case '/login':
        return MaterialPageRoute(builder: (_) => Login());
      case '/register':
        return MaterialPageRoute(builder: (_) => Register());
      case '/password':
        return MaterialPageRoute(builder: (_) => ForgotPassword());
      case '/internet':
        return MaterialPageRoute(builder: (_) => NoInternet());
      default:
        return _errorRoute();
    }
  }

  static Route<dynamic> _errorRoute() {
    return MaterialPageRoute(builder: (context) {
      return Scaffold(
        appBar: AppBar(
          title: const Text('Error'),
          elevation: 0,
          backgroundColor: Colors.white,
          iconTheme: const IconThemeData(color: Colors.black26),
        ),
        body: const Center(
          child: Text('Page not found'),
        ),
      );
    });
  }
}
