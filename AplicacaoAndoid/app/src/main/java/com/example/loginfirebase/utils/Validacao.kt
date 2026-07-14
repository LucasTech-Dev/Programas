package com.example.loginfirebase.utils

import android.util.Patterns

object Validacao {

    fun camposPreenchidos(

        email: String,

        senha: String

    ): Boolean {

        return email.isNotBlank() &&
                senha.isNotBlank()

    }

    fun emailValido(

        email: String

    ): Boolean {

        return Patterns.EMAIL_ADDRESS
            .matcher(email)
            .matches()

    }

    fun senhaValida(

        senha: String

    ): Boolean {

        return senha.length >= 6

    }

}