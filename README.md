# 🎨 Modern Design Editor Platform

A powerful Canva-like graphic design platform built with Next.js, featuring AI-powered tools, real-time autosave, and professional export capabilities.

![Next JS](https://img.shields.io/badge/Next.js-black?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-008CDD?style=flat&logo=stripe&logoColor=white)
![AI Powered](https://img.shields.io/badge/AI-Powered-purple?style=flat)

## ✨ Features

### 🎨 Core Design Features
- **Advanced Editor Tools**
  - Intuitive drag-and-drop interface
  - Multi-layer management
  - Precise alignment tools
  - Grid and guides system

- **📝 Text Editing**
  - Rich text formatting
  - Custom font support
  - Advanced typography controls
  - Text effects and styles
  - Multiple alignment options

- **🖼️ Template System**
  - Pre-designed templates
  - Custom template creation
  - Category organization
  - Quick preview mode

- **📏 Shape Tools**
  - Basic shapes library
  - Custom shape creation
  - Shape manipulation
  - Path editing
  - Group/ungroup functionality

- **🖌️ Drawing Tools**
  - Freehand drawing
  - Brush customization
  - Pressure sensitivity
  - Path smoothing

### 🤖 AI Features
- **🌟 AI Image Generation**
  - Text-to-image generation
  - Style transfer
  - Image variations
  - Powered by Replicate

- **🧹 Background Removal**
  - One-click removal
  - Edge refinement
  - Transparent background export
  - Batch processing

### 💾 Project Management
- **🔄 History Management**
  - Unlimited undo/redo
  - Action history
  - State management
  - Version control

- **📡 Auto-save System**
  - Real-time saves
  - Conflict resolution
  - Offline support
  - Version history

### 💳 Premium Features
- **Stripe Integration**
  - Subscription plans
  - Usage-based billing
  - Payment processing
  - Invoice management

- **📤 Export Options**
  - PNG export
  - SVG export
  - JPG export
  - Project JSON export
  - Batch export

## 🛠️ Technical Stack

```typescript
const techStack = {
  frontend: {
    framework: "Next.js",
    styling: ["TailwindCSS", "Shadcn UI"],
    stateManagement: "Zustand",
    canvas: "Fabric.js"
  },
  backend: {
    api: "Hono.js",
    database: "PostgreSQL (NeonDB)",
    orm: "DrizzleORM",
    auth: "Next-Auth v5"
  },
  ai: {
    imageGeneration: "Replicate",
    backgroundRemoval: "Replicate"
  },
  payments: "Stripe",
  hosting: "Vercel"
};
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- Stripe Account
- Replicate API Key

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/design-editor.git
cd design-editor
```

2. **Install dependencies**
```bash
pnpm install
```

3. **Configure environment variables**
```bash
# .env.local
# Core
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# Authentication
NEXTAUTH_SECRET=
NEXTAUTH_URL=

# AI Services
REPLICATE_API_KEY=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Storage
UPLOAD_DIR=
```

4. **Initialize the database**
```bash
pnpm db:push
```

5. **Start development server**
```bash
pnpm dev
```

```

## 💎 Core Features Implementation

### 🎨 Canvas Management

```typescript
// Canvas initialization with Fabric.js
export function useCanvas() {
  const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);

  useEffect(() => {
    const canvas = new fabric.Canvas('design-canvas', {
      width: 800,
      height: 600,
      backgroundColor: '#ffffff'
    });

    // Initialize event listeners
    canvas.on('object:modified', handleObjectModified);
    canvas.on('selection:created', handleSelection);

    setCanvas(canvas);

    return () => canvas.dispose();
  }, []);

  return canvas;
}
```

### 🔄 History Management

```typescript
// Undo/Redo implementation
export const useHistory = () => {
  const [history, setHistory] = useState<CanvasState[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const pushState = (state: CanvasState) => {
    const newHistory = history.slice(0, currentIndex + 1);
    newHistory.push(state);
    setHistory(newHistory);
    setCurrentIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      return history[currentIndex - 1];
    }
  };

  const redo = () => {
    if (currentIndex < history.length - 1) {
      setCurrentIndex(currentIndex + 1);
      return history[currentIndex + 1];
    }
  };

  return { pushState, undo, redo };
};
```

### 🤖 AI Integration

```typescript
// AI image generation
export async function generateImage(prompt: string) {
  const response = await replicate.run(
    "stability-ai/stable-diffusion:27b93a2413e7f36cd83da926f3656280b2931564ff050bf9575f1fdf9bcd7478",
    {
      input: {
        prompt,
        num_outputs: 1,
        guidance_scale: 7.5,
        num_inference_steps: 50
      }
    }
  );

  return response;
}

// Background removal
export async function removeBackground(imageUrl: string) {
  const response = await replicate.run(
    "remove-background/model",
    {
      input: {
        image: imageUrl
      }
    }
  );

  return response;
}
```

### 💾 Auto-save System

```typescript
// Real-time autosave
export function useAutosave(projectId: string, data: ProjectData) {
  useEffect(() => {
    const saveDebounced = debounce(async () => {
      try {
        await saveProject(projectId, data);
      } catch (error) {
        console.error('Autosave failed:', error);
      }
    }, 1000);

    saveDebounced();

    return () => saveDebounced.cancel();
  }, [projectId, data]);
}
```

## 🔒 Security Features

- **Authentication**
  - Next-Auth v5 integration
  - OAuth providers
  - Role-based access
  - Session management

- **Data Protection**
  - CSRF protection
  - XSS prevention
  - Rate limiting
  - Input validation

## 📤 Export Options

```typescript
// Export functionality
export async function exportProject(
  format: 'png' | 'svg' | 'jpg' | 'json',
  quality?: number
) {
  switch (format) {
    case 'png':
      return canvas.toDataURL({
        format: 'png',
        quality: quality || 1
      });
    case 'svg':
      return canvas.toSVG();
    case 'jpg':
      return canvas.toDataURL({
        format: 'jpeg',
        quality: quality || 0.8
      });
    case 'json':
      return JSON.stringify(canvas.toJSON());
  }
}
```

## 🚀 Deployment

1. **Database Setup**
```bash
# Setup PostgreSQL on Neon
pnpm db:push
```

2. **Configure Vercel**
```bash
# Set up environment variables
vercel env pull
```

3. **Deploy**
```bash
vercel deploy
```

## 📈 Performance Optimization

- Canvas rendering optimization
- Asset preloading
- Lazy loading of tools
- WebGL acceleration
- Caching strategies

## 🔄 Updates & Maintenance

- Regular dependency updates
- Performance monitoring
- Bug fixes
- Feature enhancements
- Security patches

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Fabric.js](http://fabricjs.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Shadcn UI](https://ui.shadcn.com/)
- [Replicate](https://replicate.com/)
- [Stripe](https://stripe.com/)
- [Hono](https://hono.dev/)
- [DrizzleORM](https://orm.drizzle.team/)

---

Built with 💙 by Awais Raza
