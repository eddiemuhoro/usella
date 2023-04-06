part of 'auth_bloc.dart';

@immutable
abstract class AuthState extends Equatable{
  const AuthState();

  @override
  List<Object> get props => [];
}

class AuthInitial extends AuthState  {}


class AuthLoginLoading extends AuthState {}

class AuthLoginSuccess extends AuthState {}

class AuthLoginError extends AuthState {
  final String message;

  const AuthLoginError({required this.message});
  @override
  List<Object> get props => [message];
}

class AuthRegisterLoading extends AuthState {}

class AuthRegisterSuccess extends AuthState {}

class AuthRegisterError extends AuthState {
  final String message;

  const AuthRegisterError({required this.message});
  @override
  List<Object> get props => [message];
}

class AuthVerifyLoading extends AuthState {}

class AuthVerifySuccess extends AuthState {
  final String message;
 
 const  AuthVerifySuccess({required this.message});
 @override
  List<Object> get props => [message];

}

class AuthVerifyError extends AuthState {
  final String message;

  AuthVerifyError({required this.message});
}
