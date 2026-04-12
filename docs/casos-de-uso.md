# Casos de Uso (TP1)

## Atores
- **Cidadão**
- **Administrador**

## Diagrama de caso de uso (Mermaid)
```mermaid
flowchart LR
    C[Cidadão]
    A[Administrador]

    UC1((Consultar pontos))
    UC2((Buscar pontos))
    UC3((Visualizar detalhes))
    UC4((Cadastrar ponto))
    UC5((Editar ponto))
    UC6((Excluir ponto))

    C --> UC1
    C --> UC2
    C --> UC3

    A --> UC1
    A --> UC2
    A --> UC3
    A --> UC4
    A --> UC5
    A --> UC6
```

## Relação com requisitos
- UC1 e UC2 atendem RF02 e RF03.
- UC3 atende RF04.
- UC4 atende RF01.
- UC5 atende RF05.
- UC6 atende RF06.
