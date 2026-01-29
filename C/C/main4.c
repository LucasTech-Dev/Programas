/*ANO DE NASCIMENTO*/
#include <stdio.h>
int main(void)
{
    int ano1, Ano2;
    int idade;

    printf("Por favor, digite em que ano nasceu: ");
    scanf("%i", &ano1);

    printf("\nDigite em que ano esta: ");
    scanf("%i", &Ano2);

    idade = Ano2 - ano1;
    printf("\n sua idade e: %i", idade);
}
