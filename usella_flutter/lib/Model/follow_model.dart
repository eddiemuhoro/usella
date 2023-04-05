
class Follow {
    Follow({
        this.id,
        this.followerId,
        this.followingId,
    });

    String? id;
    String? followerId;
    String? followingId;

    factory Follow.fromJson(Map<String, dynamic> json) => Follow(
        id: json["id"],
        followerId: json["followerId"],
        followingId: json["followingId"],
    );

    Map<String, dynamic> toJson() => {
        "id": id,
        "followerId": followerId,
        "followingId": followingId,
    };
}