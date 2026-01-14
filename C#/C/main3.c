/*MAIOR/MENOR DE IDADE*/
#include <stdio.h>
int main(void)
{
    int num1, num2, sub;
    printf("\nInforme o ano atual: ");
    scanf("%f", &num1);
    printf("\nInforme o que voce nasceu: ");
    scanf("%f", &num2);
    sub = num1 - num2;
    if (sub >= 18)
    {
        printf("\nVoce e maior de idade.");
    }
    else if (sub < 18)
    {
        printf("\n Voce e menor de idade.");
    }
}
