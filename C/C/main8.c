#include <stdio.h>

long long fatorial(int n)
{
    if (n <= 1)
        return 1;
    return n * fatorial(n - 1);
}

int main()
{
    int n;
    printf("Digite um número: ");
    scanf("%d", &n);
    printf("Fatorial de %d é %lld\n", n, fatorial(n));
}