import 'package:shared_preferences/shared_preferences.dart';
import 'package:usella_flutter/Util/global_constants.dart';

class SharedPreferencesmanager {
  Future isLoggedIn() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getBool(ISLOGGEDIN) ?? false;
  }

  Future setLoggedIn(bool value) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setBool(ISLOGGEDIN, value);
  }

  Future setId(String value) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setString(ID, value);
  }

  Future getId() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(ID) ?? '';
  }

  Future setName(String value) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setString(NAME, value);
  }

  Future getName() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(NAME) ?? '';
  }

  Future setEmail(String value) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setString(EMAIL, value);
  }

  Future getEmail() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(EMAIL) ?? '';
  }

  Future setPhone(String value) async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.setString(PHONE, value);
  }

  Future getPhone() async {
    final SharedPreferences prefs = await SharedPreferences.getInstance();
    return prefs.getString(PHONE) ?? '';
  }


}
