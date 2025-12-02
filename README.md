# 🗺️ AddressMap Pro

![Status do Projeto](https://img.shields.io/badge/status-ativo-success)
![Next.js](https://img.shields.io/badge/Next.js-14%2B-black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

**AddressMap Pro** é uma simulação de dashboard logístico moderno, desenvolvido para demonstrar competências avançadas em Front-End com **Next.js 14+ (App Router)**. O projeto resolve um problema real: converter um simples CEP em um contexto visual completo com geolocalização e mapas interativos.

---

## 🚀 Funcionalidades e Diferenciais

### Por que este não é apenas mais um "Buscador de CEP"?
* **Orquestração de API Dupla:** Encadeia de forma inteligente a API **ViaCEP** (para dados textuais) e **Nominatim/OpenStreetMap** (para coordenadas geográficas) para gerar uma experiência rica.
* **UX Mobile-First:** Interface projetada prioritariamente para dispositivos móveis, adaptando-se elegantemente para desktops.
* **Performance:** Utiliza `next/dynamic` para carregamento preguiçoso (lazy-loading) dos mapas (Leaflet), garantindo pontuação alta nos Core Web Vitals.
* **Estado Moderno:** O hook personalizado `useAddress` encapsula a lógica complexa de assincronismo, tratamento de erros e fetch de dados, mantendo a camada de UI limpa.

---

## 🛠️ Tecnologias e Decisões Técnicas

Este projeto foi construído com uma mentalidade de arquitetura pronta para produção:

| Tecnologia | Função | Racional da Escolha |
| :--- | :--- | :--- |
| **Next.js 14 (App Router)** | Framework | Uso de React Server Components (RSC) para escalabilidade futura e melhor performance inicial. |
| **Tailwind CSS v4** | Estilização | Utiliza a nova configuração via `@theme` e variáveis CSS nativas para um Design System manutenível. |
| **Leaflet / React-Leaflet** | Mapas | Alternativa leve e open-source ao Google Maps. Implementado com imports dinâmicos para resolver problemas de SSR. |
| **Lucide React** | Ícones | Padrão em apps React modernos (compatível com shadcn/ui), garantindo SVGs leves e nítidos. |
| **Next-Themes** | Temas | Implementação robusta de Dark Mode que respeita preferências do sistema e previne "fouc" (flash de conteúdo não estilizado). |

---

## 📂 Visão Geral da Arquitetura

A estrutura do projeto segue uma separação de componentes orientada ao domínio:

```text
src/
├── app/                  # Next.js App Router (Server Components por padrão)
├── components/
│   ├── ui/               # Componentes de UI Atômicos (Header, Botões)
│   ├── cep/              # Componentes de Domínio (Input de Busca, Detalhes)
│   ├── map/              # Lógica de Mapa Isolada (Client Component)
│   └── providers/        # Provedores de Contexto (Tema)
├── hooks/
│   └── useAddress.ts     # O "Cérebro": Gerencia o encadeamento das APIs e estado
└── styles/
    └── globals.css       # Configuração do Tailwind v4