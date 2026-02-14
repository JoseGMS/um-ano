# 💕 Um Ano de Nós - Site Comemorativo

Um site interativo e criativo em 3D para celebrar um ano de namoro, contando toda a trajetória do relacionamento de forma visual e emocionante.

## 🎨 Características

### Design & UX
- **Mobile-First**: Totalmente responsivo e otimizado para celulares
- **Animações 3D**: Elementos Three.js interativos (xícara de café, bola de futebol, avião, dunas)
- **Scroll Storytelling**: Narrativa contada através do scroll com parallax
- **Efeitos Visuais**: Partículas, ondas, confetes e transições suaves
- **Cards 3D**: Efeitos de profundidade ao passar o mouse

### Tecnologias Utilizadas
- **HTML5**: Estrutura semântica
- **CSS3**: Animações, gradientes, transformações 3D
- **JavaScript (Vanilla)**: Lógica e interatividade
- **Three.js**: Renderização 3D (partículas, objetos 3D)
- **GSAP + ScrollTrigger**: Animações suaves baseadas em scroll

## 📖 Estrutura da História

1. **Introdução**: Animação de xícara de café 3D - "Tudo começou com café..."
2. **Capítulo 1**: O café que mudou tudo
3. **Capítulo 2**: Escape Room - primeira vez que se viram
4. **Capítulo 3**: A praia - aproximação
5. **Capítulo 4**: Primeiro encontro + história do pai/Karin
6. **Capítulo 5**: Ubatuba - aventuras
7. **Capítulo 6**: Vinhedo e a "padaria" (com easter egg!)
8. **Capítulo 7**: Apoio nos momentos difíceis
9. **Capítulo 8**: Chalezinho - 3 meses de namoro
10. **Capítulo 9**: Jogo do rival - ela no estádio
11. **Tributo**: Características especiais dela
12. **REVELAÇÃO**: Quiz musical interativo + anúncio da viagem aos Lençóis Maranhenses

## 🎁 Revelação do Presente

O site termina com um quiz musical interativo onde ela precisa completar a música:

> "Deus tava me preparando esse tempo todo
> Te deixou pro final
> Tava esconde o **____**"

Ao acertar **OURO**, é revelado o presente: **Viagem completa aos Lençóis Maranhenses** com:
- ✈️ Passagens ida e volta
- 🏨 Hospedagem incluída
- 🏝️ Aventura nos lençóis

A revelação inclui:
- Confetes animados
- Avião 3D voando
- Mapa animado mostrando a rota
- Dunas 3D dos Lençóis com lagoas
- Animações de água e pôr do sol

## 🚀 Como Usar

### Opção 1: Abrir Diretamente
1. Certifique-se de que todos os arquivos estão na mesma pasta
2. Abra o arquivo `index.html` em um navegador moderno (Chrome, Firefox, Edge, Safari)
3. Pronto! O site está funcionando

### Opção 2: Servidor Local (Recomendado)
Para melhor performance, use um servidor local:

```bash
# Se tiver Python instalado:
python -m http.server 8000

# Ou com Node.js (npx):
npx serve

# Ou com VS Code:
# Instale a extensão "Live Server" e clique em "Go Live"
```

Depois acesse: `http://localhost:8000`

## 📁 Estrutura de Arquivos

```
umano/
├── index.html          # Estrutura principal
├── style.css           # Estilos e animações
├── script.js           # Lógica e interatividade
├── README.md           # Este arquivo
└── fotos/              # Pasta com as fotos
    ├── 20250427_183934.jpg
    ├── 20250427_184055.jpg
    ├── 20250515_221224.jpg
    └── ... (21 fotos no total)
```

## 🎮 Interatividade

### Easter Eggs
- Clique em **"padaria"** na seção de Vinhedo para revelar uma mensagem secreta

### Controles
- **Scroll**: Navegue pela história
- **Mouse hover**: Efeitos 3D nos cards e fotos
- **Carousel**: Use as setas < > para navegar pelas fotos de Ubatuba
- **Quiz**: Digite as letras e clique em "Revelar Presente"

## 🎨 Personalizações Possíveis

### Alterar Cores
No arquivo `style.css`, edite as variáveis CSS no `:root`:

```css
:root {
    --primary: #ff6b9d;      /* Rosa principal */
    --secondary: #c44569;     /* Rosa escuro */
    --accent: #ffd93d;        /* Amarelo */
    --beach: #6bcfff;         /* Azul */
    /* ... */
}
```

### Alterar Data do Relacionamento
No arquivo `script.js`, função `updateDaysCounter()`:

```javascript
const startDate = new Date('2024-02-14'); // Altere para a data correta
```

### Adicionar/Remover Fotos
1. Adicione fotos na pasta `fotos/`
2. Edite `index.html` e adicione tags `<img>` nas seções desejadas

## 📱 Compatibilidade

- ✅ Chrome/Edge (Chromium) 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- Lazy loading de imagens
- Otimização de animações (GPU acceleration)
- Partículas limitadas para melhor performance mobile
- Redução de movimento para acessibilidade (`prefers-reduced-motion`)

## 🎯 Dicas para a Apresentação

1. **Abra em tela cheia** (F11) para melhor experiência
2. **Use em celular** para testar a versão mobile
3. **Ative o som** se adicionar música de fundo (atualmente desativado)
4. **Faça scroll devagar** para aproveitar todas as animações
5. **Interaja** com os elementos: passe o mouse, clique nos easter eggs

## 💡 Ideias Futuras

- Adicionar música de fundo (opcional, com controle)
- Galeria expandida com mais fotos
- Modo escuro/claro
- Compartilhar em redes sociais
- Timeline interativa com todas as datas importantes
- Vídeos integrados

## ❤️ Créditos

- **Desenvolvido com amor por**: Radamar
- **Bibliotecas**: Three.js, GSAP
- **Inspiração**: Amor verdadeiro ☕💕

---

## 🎊 Feliz Aniversário de 1 Ano!

Que venham muitos mais capítulos dessa história incrível! 🌅

---

*"Tudo começou com café, mas se transformou em muito mais..."* ☕💙
