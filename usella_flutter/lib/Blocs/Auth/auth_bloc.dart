import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import 'package:usella_flutter/Blocs/Authentication/authentication_bloc.dart';
import 'package:usella_flutter/Repositories/repository.dart';
import 'package:usella_flutter/Util/preference_manager.dart';

part 'auth_event.dart';
part 'auth_state.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {
  final AuthenticationBloc authenticationBloc;
  AuthBloc({required this.authenticationBloc}) : super(AuthInitial()) {
    on<Login>((event, emit) async {
      emit(AuthLoginLoading());
      try {
        final user = await Repository().login(
          email: event.email,
          password: event.password,
        );
        authenticationBloc.add(LoggedIn());
        await SharedPreferencesmanager().setName(user.name!);
        await SharedPreferencesmanager().setEmail(user.email!);
        await SharedPreferencesmanager().setPhone(user.phone!);
        await SharedPreferencesmanager().setId(user.id!);
        emit(AuthLoginSuccess());
      } catch (e) {
        emit(AuthLoginError(message: e.toString()));
      }
    });

    on<Register>((event, emit) async {
      emit(AuthRegisterLoading());
      try {
        await Repository().register(
          email: event.email,
          password: event.password,
          name: event.name,
          phone: event.phone,
        );
        emit(AuthRegisterSuccess());
      } catch (e) {
        emit(AuthRegisterError(message: e.toString()));
      }
    });

    on<Verify>((event, emit) async {
      emit(AuthVerifyLoading());
      try {
        final user = await Repository().verifyUser(
          email: event.email,
          code: event.code,
        );
        await SharedPreferencesmanager().setName(user.name!);
        await SharedPreferencesmanager().setEmail(user.email!);
        await SharedPreferencesmanager().setPhone(user.phone!);
        await SharedPreferencesmanager().setId(user.id!);
        emit(const AuthVerifySuccess(message: 'Verification successful'));
      } catch (e) {
        emit(AuthVerifyError(message: e.toString()));
      }
    });
  }
}
