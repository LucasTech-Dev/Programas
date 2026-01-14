/*CALCULADORA*/
#include <stdio.h>
#include <conio.h>

int main(void)
{

    float soma = 0, sub = 0, div = 0, multi = 0;
    float num1 = 0, num2 = 0;
    char op = ' ';

    while (op != 'S')
    {
        printf("Informe um numero:\n");
        scanf("%f", &num1);

        printf("Informe um outro numero:\n");
        scanf("%f", &num2);

        printf("Escolha uma opcao: \n + \n - \n * \n / \n S - Sair \n N- Continuar");
        scanf("%s", &op);

        switch (op)
        {

        case '+':
        {
            soma = num1 + num2;
            printf("A soma e: %f", soma);
            break;
        }

        case '-':
        {
            sub = num1 - num2;
            printf("A subtracao e: %f", sub);
            break;
        }

        case '*':
        {
            multi = num1 * num2;
            printf("A multiplicacao e: %f", multi);
            break;
        }

        case '/':
        {
            div = num1 / num2;
            printf("A divisao e: %f", div);
            break;
        }

        case 'S':
        {
            printf("Programa finalizado com sucesso!\n");
            op = 'S';
            break;
        }

        default:
        {
            printf("opcao invalida!");
            break;
        }
        }
    }
}