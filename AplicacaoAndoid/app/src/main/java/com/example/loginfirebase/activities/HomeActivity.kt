package com.example.loginfirebase.activities

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.loginfirebase.databinding.ActivityHomeBinding
import com.example.loginfirebase.firebase.FirebaseManager
import com.example.loginfirebase.repository.UsuarioRepository

class HomeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityHomeBinding

    private val repository = UsuarioRepository()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityHomeBinding.inflate(layoutInflater)

        setContentView(binding.root)

        carregarUsuario()

        configurarLogout()

    }

    /**
     * Busca as informações
     * do usuário no Firestore.
     */
    private fun carregarUsuario() {

        val uid = FirebaseManager.auth.currentUser?.uid

        if (uid == null) {

            voltarLogin()

            return

        }

        repository.buscarUsuario(

            uid,

            onSuccess = { usuario ->

                binding.textNome.text = usuario.nome

                binding.textEmail.text = usuario.email

            },

            onError = {

                Toast.makeText(
                    this,
                    it,
                    Toast.LENGTH_LONG
                ).show()

            }

        )

    }

    /**
     * Logout do Firebase.
     */
    private fun configurarLogout() {

        binding.btnLogout.setOnClickListener {

            FirebaseManager.auth.signOut()

            Toast.makeText(
                this,
                "Logout realizado com sucesso.",
                Toast.LENGTH_SHORT
            ).show()

            voltarLogin()

        }

    }

    /**
     * Volta para Login
     * removendo todas as telas
     * anteriores da pilha.
     */
    private fun voltarLogin() {

        val intent = Intent(
            this,
            LoginActivity::class.java
        )

        intent.flags =
            Intent.FLAG_ACTIVITY_NEW_TASK or
            Intent.FLAG_ACTIVITY_CLEAR_TASK

        startActivity(intent)

        finish()

    }

}