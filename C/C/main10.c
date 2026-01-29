#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main()
{
    int num, chute, tentativas = 0;
    srand(time(NULL));
    num = rand() % 100 + 1;

    do
    {
        printf("Adivinhe o número (1 a 100): ");
        scanf("%d", &chute);
        tentativas++;
        if (chute > num)
            printf("Muito alto!\n");
        else if (chute < num)
            printf("Muito baixo!\n");
    } while (chute != num);

    printf("Acertou em %d tentativas!\n", tentativas);
    return 0;
}