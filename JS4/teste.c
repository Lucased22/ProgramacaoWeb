#include <stdio.h>
#include <stdlib.h>
#include <stdint.h>
#include <unistd.h>

int main(int argc, char *argv[]) {
    if (argc != 2) {
        fprintf(stderr, "Uso: %s <quantidade_em_bytes>\n", argv[0]);
        return 1;
    }

    // Converte o argumento para um número inteiro de 64 bits
    uint64_t tamanho = atoll(argv[1]);
    printf("Alocando %llu bytes...\n", tamanho);

    // Tenta alocar a memória
    char *v = malloc(tamanho);
    if (v == NULL) {
        perror("Erro ao alocar memória");
        return 1;
    }

    printf("Memória alocada com sucesso. Acessando elementos em loop infinito...\n");

    // Loop infinito acessando todos os elementos
    uint64_t i = 0;
    while (1) {
        v[i % tamanho] = (char)(i % 256);
        i++;
        usleep(1); // Pequena pausa para não travar o sistema
    }

    return 0;
}
