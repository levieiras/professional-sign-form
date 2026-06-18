# Professional Sign Form

Wizard interativo para criação personalizada de logos 3D. Clientes preenchem um formulário multi-etapas com identidade visual, cores e textos — a solicitação é enviada por e-mail para produção.

Desenvolvido com **Next.js 16**, **React 18**, **Tailwind CSS v4** e **Framer Motion**.

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.2.0-61dafb?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.40.0-ff00ff?logo=framer)

## Funcionalidades

- **Wizard multi-etapas** com navegação por swipe (mobile) e botões
- **Seleção de tipo de logo**: Econômica (galeria de modelos) ou Customizada (upload)
- **Seletor de cores** com paleta pré-definida e picker personalizado
- **Feedback háptico** para dispositivos móveis
- **Detecção de teclado virtual** para otimização mobile
- **Persistência automática** do progresso no localStorage
- **Resumo completo** antes do envio
- **API de e-mail** integrada com Nodemailer + Gmail
- **Error boundary** para recuperação de falhas

## Stack

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

## Estrutura

```
professional-sign-form/
├── app/
│   ├── api/
│   │   ├── images/route.js        # Listagem de modelos
│   │   └── send-email/route.js    # Envio de e-mail
│   ├── wizard/page.js             # Página do wizard
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── components/
│   ├── wizard/                    # Etapas do formulário
│   │   ├── WizardContainer.jsx    # Container principal
│   │   ├── StepIdentification.jsx
│   │   ├── StepLogoType.jsx
│   │   ├── StepEconomicGallery.jsx
│   │   ├── StepCustomUpload.jsx
│   │   ├── StepColorPicker.jsx
│   │   ├── StepTextInput.jsx
│   │   ├── StepSummary.jsx
│   │   └── StepSuccess.jsx
│   └── ui/                        # Componentes base
├── lib/
│   ├── hooks/                     # Hooks (haptic, viewport)
│   ├── storage.js                 # Persistência localStorage
│   └── validations.js             # Schemas Zod
└── public/models/                 # Modelos 3D disponíveis
```

## Cores Disponíveis

| Categoria | Cores |
|-----------|-------|
| **Neutros** | Branco, Prata, Cinza, Grafite, Preto, Preto Carbono |
| **Terra** | Caramelo, Tabaco, Terracota, Café, Chocolate |
| **Claros** | Baunilha, Areia, Pêssego, Rosa Claro |
| **Vibrantes** | Vermelho, Rosa, Magenta, Lilás, Lavanda |
| **Frias** | Roxo, Índigo, Royal, Azul Médio, Azul Claro |
| **Verdes** | Floresta, Petróleo, Água, Menta, Limão |
| **Quentes** | Amarelo Vivo, Âmbar, Laranja, Dourado |

## Variáveis de Ambiente

```env
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=senha-de-app-do-gmail
EMAIL_TO=levieiras.art@gmail.com
```

## Scripts

```bash
npm run dev     # Desenvolvimento
npm run build   # Build de produção
npm run start   # Servidor de produção
```

---

<p align="center">Feito com 💚 usando Next.js + Tailwind CSS + Framer Motion</p>
