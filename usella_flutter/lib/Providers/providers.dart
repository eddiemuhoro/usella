import 'dart:convert';

import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:http/http.dart';
import 'package:usella_flutter/Blocs/Network/network_bloc.dart';
import 'package:usella_flutter/Util/global_constants.dart';

class Providers {
  final http = Client();
  Future<Response> register(
      {required String name,
      required String email,
      required String phone,
      required String password}) async {
    try {
      final data = {
        'name': name,
        'email': email,
        'phone': phone,
        'password': password,
      };
      final request = json.encode(data);
      var response = await http.post(
        Uri.parse('$APPURL/register'),
        body: request,
      );
      return response;
    } catch (e) {
      throw Exception(e);
    }
  }

  Future<Response> login(
      {required String email, required String password}) async {
    try {
      final data = {
        'email': email,
        'password': password,
      };
      final request = json.encode(data);
      var response = await http.post(
        Uri.parse('$APPURL/login'),
        body: request,
      );
      return response;
    } catch (e) {
      throw Exception(e);
    }
  }

  Future<Response> verifyUser(
      {required String email, required String code}) async {
    try {
      var response = await http.post(
        Uri.parse('$APPURL/users/verify/$email/$code'),
      );
      return response;
    } catch (e) {
      throw Exception(e);
    }
  }

  observeNetwork() {
    Connectivity().onConnectivityChanged.listen((ConnectivityResult result) {
      if (result == ConnectivityResult.none) {
        NetworkBloc().add(const NetworkNotify());
      } else {
        NetworkBloc().add(const NetworkNotify(isConnected: true));
      }
    });
  }
}
