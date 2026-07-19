package com.example.loginfirebase.activities

import android.content.Intent
import android.os.Bundle
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.loginfirebase.databinding.ActivityLoginBinding
import com.example.loginfirebase.firebase.FirebaseManager
import com.example.loginfirebase.repository.UsuarioRepository
import com.example.loginfirebase.utils.Validacao

class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    private val repository = UsuarioRepository()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        binding = ActivityLoginBinding.inflate(layoutInflater)

        setContentView(binding.root)

        verificarSessao()

        binding.btnEntrar.setOnClickListener {

            realizarLogin()

        }

    }

    /**
     * Caso o usuário já esteja autenticado,
     * entra diretamente na Home.
     */
    private fun verificarSessao() {

        if (FirebaseManager.auth.currentUser != null) {

            abrirHome()

        }

    }

    /**
     * Executa todas as validações
     * e realiza o login.
     */
    private fun realizarLogin() {

        val email = binding.editEmail.text.toString().trim()

        val senha = binding.editSenha.text.toString().trim()

        if (!Validacao.camposPreenchidos(email, senha)) {

            Toast.makeText(
                this,
                "Preencha todos os campos.",
                Toast.LENGTH_SHORT
            ).show()

            return

        }

        if (!Validacao.emailValido(email)) {

            binding.editEmail.error = "E-mail inválido"

            binding.editEmail.requestFocus()

            return

        }

        if (!Validacao.senhaValida(senha)) {

            binding.editSenha.error = "Senha deve possuir no mínimo 6 caracteres."

            binding.editSenha.requestFocus()

            return

        }

        binding.progressLogin.visibility = View.VISIBLE

        binding.btnEntrar.isEnabled = false

        FirebaseManager.auth

            .signInWithEmailAndPassword(email, senha)

            .addOnSuccessListener {

                buscarUsuario()

            }

            .addOnFailureListener {

                binding.progressLogin.visibility = View.GONE

                binding.btnEntrar.isEnabled = true

                Toast.makeText(
                    this,
                    it.localizedMessage,
                    Toast.LENGTH_LONG
                ).show()

            }

    }

    /**
     * Busca os dados do usuário
     * no Firestore.
     */
    private fun buscarUsuario() {

        val uid = FirebaseManager.auth.currentUser?.uid ?: return

        repository.buscarUsuario(

            uid,

            onSuccess = {

                binding.progressLogin.visibility = View.GONE

                Toast.makeText(
                    this,
                    "Bem-vindo ${it.nome}",
                    Toast.LENGTH_SHORT
                ).show()

                abrirHome()

            },

            onError = {

                binding.progressLogin.visibility = View.GONE

                binding.btnEntrar.isEnabled = true

                Toast.makeText(
                    this,
                    it,
                    Toast.LENGTH_LONG
                ).show()

            }

        )

    }

    /**
     * Navega para Home.
     */
    private fun abrirHome() {

        startActivity(

            Intent(
                this,
                HomeActivity::class.java
            )

        )

        finish()

    }

}