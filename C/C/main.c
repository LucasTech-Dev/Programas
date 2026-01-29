/*CONTADOR INTELIGENTE */
#include <stdio.h>

int main(void)
{
    int numenor, numaior, nuref1, nuref2;

    printf("digite um numero para iniciarmos a contagem:\n");
    scanf("%i", &nuref1);
    printf("digite um numero para encerrar a contagem:\n");
    scanf("%i", &nuref2);

    if (nuref2 < nuref1)
    {
        printf("\nContagem ivalida!");
    }
    else
    {
        for (int i = nuref1; i <= nuref2; i++)
        {
            // Verifica se o número é par ou ímpar
            if (i % 2 == 0)
            {
                printf("O numero %i e par.\n", i);
            }
            else
            {
                printf("O numero %i e impar.\n", i);
            }
        }
    }
    printf("\nFim Da Contagem!");
}
