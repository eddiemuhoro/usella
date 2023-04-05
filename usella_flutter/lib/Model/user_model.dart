// To parse this JSON data, do
//
//     final user = userFromJson(jsonString);

import 'dart:convert';

import 'package:usella_flutter/Model/follow_model.dart';
import 'package:usella_flutter/Model/product_model.dart';

List<User> userFromJson(String str) =>
    List<User>.from(json.decode(str).map((x) => User.fromJson(x)));

String userToJson(List<User> data) =>
    json.encode(List<dynamic>.from(data.map((x) => x.toJson())));

class User {
  User({
    this.id,
    this.name,
    this.email,
    this.phone,
    this.location,
    this.bio,
    this.profilePic,
    this.isVerified,
    this.coverPic,
    this.product,
    this.review,
    this.followers,
    this.following,
    this.usellaReviews,
  });

  String? id;
  String? name;
  String? email;
  String? phone;
  String? location;
  String? bio;
  String? profilePic;
  bool? isVerified;
  String? coverPic;
  List<Product>? product;
  List<dynamic>? review;
  List<Follow>? followers;
  List<Follow>? following;
  dynamic usellaReviews;

  factory User.fromJson(Map<String, dynamic> json) => User(
        id: json["id"],
        name: json["name"],
        email: json["email"],
        phone: json["phone"],
        location: json["location"],
        bio: json["bio"],
        profilePic: json["profile_pic"],
        isVerified: json["isVerified"],
        coverPic: json["cover_pic"],
        product: json["product"] == null
            ? []
            : List<Product>.from(
                json["product"]!.map((x) => Product.fromJson(x))),
        review: json["review"] == null
            ? []
            : List<dynamic>.from(json["review"]!.map((x) => x)),
        followers: json["followers"] == null
            ? []
            : List<Follow>.from(
                json["followers"]!.map((x) => Follow.fromJson(x))),
        following: json["following"] == null
            ? []
            : List<Follow>.from(
                json["following"]!.map((x) => Follow.fromJson(x))),
        usellaReviews: json["usellaReviews"],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "email": email,
        "phone": phone,
        "location": location,
        "bio": bio,
        "profile_pic": profilePic,
        "isVerified": isVerified,
        "cover_pic": coverPic,
        "product": product == null
            ? []
            : List<dynamic>.from(product!.map((x) => x.toJson())),
        "review":
            review == null ? [] : List<dynamic>.from(review!.map((x) => x)),
        "followers": followers == null
            ? []
            : List<dynamic>.from(followers!.map((x) => x.toJson())),
        "following": following == null
            ? []
            : List<dynamic>.from(following!.map((x) => x.toJson())),
        "usellaReviews": usellaReviews,
      };
}
