import 'dart:convert';

import 'package:usella_flutter/Model/user_model.dart';
import 'package:usella_flutter/Model/verified_model.dart';
import 'package:usella_flutter/Providers/providers.dart';
import 'package:usella_flutter/Util/preference_manager.dart';

class Repository {
  Future<User> register(
      {required String name,
      required String email,
      required String phone,
      required String password}) async {
    try {
      final response = await Providers()
          .register(name: name, email: email, phone: phone, password: password);
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        await SharedPreferencesmanager().setLoggedIn(true);
        return User.fromJson(data);
      } else {
        final error = json.decode(response.body);
        throw error['message'];
      }
    } catch (e) {
      throw e.toString();
    }
  }

  Future<Verified> login(
      {required String email, required String password}) async {
    try {
      final response =
          await Providers().login(email: email, password: password);
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        await SharedPreferencesmanager().setLoggedIn(true);
        return Verified.fromJson(data);
      } else {
        final error = json.decode(response.body);
        throw error['message'];
      }
    } catch (e) {
      throw e.toString();
    }
  }

  Future<Verified> verifyUser(
      {required String email, required String code}) async {
    try {
      final response = await Providers().verifyUser(email: email, code: code);
      if (response.statusCode == 200) {
        final data = json.decode(response.body);
        await SharedPreferencesmanager().setLoggedIn(true);
        return Verified.fromJson(data);
      } else {
        final error = json.decode(response.body);
        throw error['message'];
      }
    } catch (e) {
      throw e.toString();
    }
  }
}
