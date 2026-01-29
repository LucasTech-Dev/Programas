#include <stdio.h>

int main()
{
    int n, i, a = 0, b = 1, temp;

    printf("Quantos termos? ");
    scanf("%d", &n);

    printf("Sequência: ");
    for (i = 0; i < n; i++)
    {
        printf("%d ", a);
        temp = a + b;
        a = b;
        b = temp;
    }
}