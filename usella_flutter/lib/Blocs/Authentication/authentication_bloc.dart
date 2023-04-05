import 'package:bloc/bloc.dart';
import 'package:equatable/equatable.dart';
import 'package:meta/meta.dart';
import 'package:usella_flutter/Util/preference_manager.dart';

part 'authentication_event.dart';
part 'authentication_state.dart';

class AuthenticationBloc
    extends Bloc<AuthenticationEvent, AuthenticationState> {
  AuthenticationBloc() : super(AuthenticationUnitialized()) {
    on<AppStarted>((event, emit) async {
      try {
        final isLoggedIn = await SharedPreferencesmanager().isLoggedIn();

        if (isLoggedIn) {
          emit(AuthenticationAuthenticated());
        } else {
          emit(AuthenticationUnauthenticated());
        }
      } catch (e) {
        emit(AuthenticationError(message: e.toString()));
      }
    });

    on<LoggedIn>((event, emit) async {
      emit(AuthenticationLoading());
      try {
        await SharedPreferencesmanager().setLoggedIn(true);
        emit(AuthenticationAuthenticated());
      } catch (e) {
        emit(AuthenticationError(message: e.toString()));
      }
    });

    on<LoggedOut>((event, emit) async {
      emit(AuthenticationLoading());
      try {
        await SharedPreferencesmanager().setLoggedIn(false);
        emit(AuthenticationUnauthenticated());
      } catch (e) {
        emit(AuthenticationError(message: e.toString()));
      }
    });
  }
}
