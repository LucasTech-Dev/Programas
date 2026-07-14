package com.example.loginfirebase.repository

import com.example.loginfirebase.firebase.FirebaseManager
import com.example.loginfirebase.model.Usuario

class UsuarioRepository {

    fun buscarUsuario(

        uid: String,

        onSuccess: (Usuario) -> Unit,

        onError: (String) -> Unit

    ) {

        FirebaseManager.firestore

            .collection("usuarios")

            .document(uid)

            .get()

            .addOnSuccessListener { document ->

                if (document.exists()) {

                    val usuario =
                        document.toObject(Usuario::class.java)

                    if (usuario != null) {

                        onSuccess(usuario)

                    } else {

                        onError("Erro ao carregar usuário.")

                    }

                } else {

                    onError("Usuário não encontrado.")

                }

            }

            .addOnFailureListener {

                onError(
                    it.localizedMessage
                        ?: "Erro desconhecido."
                )

            }

    }

}