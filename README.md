# Professional Sign Form

Wizard interativo para criação personalizada de logos 3D. Desenvolvido com **Next.js 16**, **React 18**, **Tailwind CSS v4** e **Framer Motion**.

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.40.0-ff00ff?logo=framer)

## 🚀 Funcionalidades

- **Wizard multi-etapas** com navegação por swipe (mobile) e botões
- **Seleção de tipo de logo**: Econômica (galeria de modelos) ou Customizada (upload)
- **Seletor de cores** com paleta de cores pré-definidas e picker personalizado
- **Feedback háptico** para dispositivos móveis (vibração ao selecionar)
- **Detecção de teclado virtual** para otimização mobile
- **Persistência automática** do progresso no localStorage
- **Guia visual** das partes do logo em cada etapa
- **Resumo completo** antes do envio
- **API de e-mail** integrada com Nodemailer

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Descrição |
|------------|--------|-----------|
| Next.js | 16.2.9 | Framework React com App Router |
| React | 18.2.0 | Biblioteca UI |
| Tailwind CSS | v4 | Estilização utility-first |
| Framer Motion | 12.40.0 | Animações fluidas |
| React Hook Form | 7.79.0 | Gerenciamento de formulários |
| Zod | 4.4.3 | Validação de schemas |
| Sonner | latest | Toast notifications |
| Lucide React | latest | Ícones |
| Canvas Confetti | 1.9.4 | Efeitos visuais |

## 📁 Estrutura do Projeto

```
professional-sign-form/
├── app/
│   ├── api/
│   │   └── send-email/
│   │       └── route.js          # API de envio de e-mail
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   └── wizard/
│       ├── BackButton.jsx
│       ├── StepColorPicker.jsx   # Seletor de cores (reutilizável)
│       ├── StepCustomUpload.jsx  # Upload de referência
│       ├── StepEconomicGallery.jsx
│       ├── StepIdentification.jsx
│       ├── StepLogoType.jsx
│       ├── StepSuccess.jsx
│       ├── StepSummary.jsx
│       ├── StepTextInput.jsx
│       └── WizardContainer.jsx   # Container principal
├── lib/
│   ├── hooks/
│   │   ├── useHaptic.js          # Feedback háptico
│   │   └── useVisualViewport.js  # Detecção de teclado mobile
│   └── storage.js                # Persistência localStorage
└── public/
    └── models/                   # Modelos 3D disponíveis
```

## 🚀 Começando

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/leandro2vieira/professional-sign-form.git
cd professional-sign-form

# Instale as dependências
npm install

# Rode o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) para ver a aplicação.

## 📱 Uso

O wizard é composto por 8 etapas principais:

1. **Identificação** — Coleta nome, email e WhatsApp
2. **Tipo de Logo** — Escolha entre Econômica ou Customizada
3. **Modelo/Upload** — Galeria de modelos ou upload de referência
4. **Cor do Objeto** — Seleção de cor para o logo (paleta + picker)
5. **Texto da Base** — Texto sobre a base
6. **Cor do Texto da Base** — Cor do texto externo
7. **Texto Interno** — Texto dentro da base (positivo/negativo)
8. **Cor do Texto Interno** — Cor do texto interno (se positivo)
9. **Cor da Base** — Cor final da base
10. **Resumo** — Revisão e envio da solicitação

### Mobile-First

- **Navegação por swipe** — Deslize horizontal para avançar/voltar
- **Visual viewport** — Ajuste automático quando teclado abre
- **Haptic feedback** — Vibração ao selecionar cores/opções

## 🎨 Cores Disponíveis

A paleta inclui:

- **Neutros**: Branco, Prata, Cinza, Grafite, Preto, Preto Carvão
- **Terra**: Caramelo, Tabaco, Terracota, Café, Chocolate
- **Claros**: Baunilha, Areia, Pêssego, Rosa Claro
- **Vibrantes**: Vermelho, Rosa, Magenta, Lilás, Lavanda
- **Frias**: Roxo, Índigo, Royal, Azul Médio, Azul Claro
- **Verdes**: Floresta, Petróleo, Água, Menta, Limão
- **Quentes**: Amarelo Vivo, Âmbar, Laranja, Dourado

## 🔧 Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz:

```env
# Configurações de e-mail (Nodemailer)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=seu_email@example.com
SMTP_PASS=sua_senha
SMTP_FROM=seu_email@example.com
```

## 🚀 Deploy na Vercel

A aplicação está configurada para deploy automático na Vercel:

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente
3. A Vercel fará o build e deploy automaticamente

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/leandro2vieira/professional-sign-form)

## 📝 Scripts Disponíveis

```bash
npm run dev     # Servidor de desenvolvimento
npm run build   # Build de produção
npm run start   # Inicia servidor de produção
```

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 License

ISC

## 👤 Autor

**Leandro Vieira**

- GitHub: [@leandro2vieira](https://github.com/leandro2vieira)
- Projeto: [Professional Sign Form](https://github.com/leandro2vieira/professional-sign-form)

---

<p align="center">Feito com 💚 usando Next.js + Tailwind CSS + Framer Motion</p>