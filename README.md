# Valentine's Day Website 💕

A personal, romantic journey-based website built with Next.js for a special someone.

## 🎉 Quick Start

```bash
cd valentine-site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 🚀 Deploy to Vercel

```bash
npm install -g vercel
vercel
```

You'll get a secret URL to share with your girlfriend!

## ✨ Features

- 🎯 **5-Section Journey**: Landing → Interactive → Transition → Sentimental → Surprise
- 💝 **Interactive Games**: Relationship quiz + flip cards
- 📸 **Photo Gallery**: Slideshow with swipe gestures
- ⏰ **Timeline**: Your relationship milestones
- 💌 **Love Letter**: Heartfelt message display
- 🎨 **Beautiful Animations**: Framer Motion powered
- 📱 **Mobile-First**: Optimized for phones
- ⚡ **Fast**: Static generation + image optimization

## 📝 Customize Your Site

### 1. Edit Content

Open `lib/content.ts` and update:
- Welcome message
- Quiz questions about your relationship
- Flip card messages ("reasons I love you")
- Your heartfelt letter
- Photo gallery paths
- Timeline events
- Final surprise message

### 2. Add Photos

1. Create folders:
   - `/public/photos/` - gallery images
   - `/public/timeline/` - timeline images

2. Add your photos and update paths in `lib/content.ts`

### 3. Customize Colors (Optional)

Edit `app/globals.css` to change the romantic color scheme.

## 📚 Documentation

- **PROJECT_SUMMARY.md** - Complete feature overview
- **DEPLOYMENT.md** - Detailed deployment guide
- **README.md** - This file

## 🛠 Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- React Testing Library + Jest
- Property-based testing with fast-check

## 📁 Project Structure

```
valentine-site/
├── app/              # Next.js app router pages
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions & content
├── types/           # TypeScript type definitions
└── public/          # Static assets (add your photos here!)
```

## 🎯 User Journey

1. Landing page with floating hearts
2. Fun relationship quiz
3. Flip cards revealing reasons you love her
4. Beautiful transition moment
5. Heartfelt letter
6. Photo gallery of memories
7. Relationship timeline
8. Final surprise with confetti!

## 🧪 Testing

```bash
npm test
npm run test:watch
```

## 🏗 Build

```bash
npm run build
npm start
```

## 💡 Tips

- Test on mobile before sharing
- Keep photos under 500KB
- Personalize all content in `lib/content.ts`
- The Vercel URL is your "secret" link

---

**Made with ❤️ for Valentine's Day**

