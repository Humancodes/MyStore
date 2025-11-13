<!-- 421f24cf-901e-41e9-9a66-d39213e3b93a 42c7d0ba-07ae-4a3b-ade1-7eede6e57b30 -->
# E-Commerce Multi-Vendor Platform - Complete Learning Plan

## Tech Stack

- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **State Management:** Redux Toolkit + React Query
- **Backend/Database:** Firebase (Auth, Firestore, Storage)
- **Payment:** Stripe (test mode)
- **Charts:** ApexCharts (react-apexcharts)
- **Performance:** react-window, next/image, next/dynamic

---

## Module 1: Development Environment Setup (1-2 hours)

**Goal:** Complete tooling setup for code quality and consistency

### Tasks:

1. Install and configure Prettier with Next.js-friendly rules
2. Set up Husky for pre-commit hooks (lint + format)
3. Add pre-commit and pre-push git hooks
4. Update `package.json` scripts for lint, format, and type-check
5. Test the entire setup with a sample commit

**Files to create/modify:**

- `.prettierrc.json`
- `.prettierignore`
- `.husky/pre-commit`
- `package.json` (add scripts)

---

## Module 2: Fake Store API Integration & Basic Product Listing (2-3 hours)

**Goal:** Fetch and display products from Fake Store API to understand data flow

### Tasks:

1. Create API service layer in `src/services/fakeStoreApi.ts`
2. Create TypeScript interfaces for Product, Category types
3. Build basic products page at `src/app/products/page.tsx`
4. Create reusable ProductCard component with shadcn/ui Card
5. Display products in a responsive grid layout

**Files to create:**

- `src/types/product.ts`
- `src/services/fakeStoreApi.ts`
- `src/app/products/page.tsx`
- `src/components/ProductCard.tsx`

---

## Module 3: Redux Toolkit Store Setup (1-2 hours)

**Goal:** Set up Redux store with initial slices architecture

### Tasks:

1. Create Redux store configuration in `src/store/store.ts`
2. Create empty slice files (products, cart, filters, auth, seller)
3. Set up Redux Provider in root layout
4. Install Redux DevTools integration
5. Create TypeScript types for RootState and AppDispatch

**Files to create:**

- `src/store/store.ts`
- `src/store/slices/productsSlice.ts`
- `src/store/slices/cartSlice.ts`
- `src/store/slices/filtersSlice.ts`
- `src/store/slices/authSlice.ts`
- `src/store/slices/sellerSlice.ts`
- `src/store/hooks.ts` (typed hooks)
- `src/providers/ReduxProvider.tsx`

---

## Module 4: React Query Setup & Integration (1-2 hours)

**Goal:** Configure React Query for server state management and caching

### Tasks:

1. Create QueryClient configuration with optimal cache settings
2. Set up React Query Provider with devtools
3. Create custom hooks for fetching products using React Query
4. Implement loading states and error handling
5. Test cache behavior and refetch strategies

**Files to create:**

- `src/providers/QueryProvider.tsx`
- `src/hooks/useProducts.ts`
- `src/hooks/useProductById.ts`
- Update `src/app/layout.tsx` to wrap with QueryProvider

---

## Module 5: Firebase Authentication Setup (2-3 hours)

**Goal:** Implement Firebase auth with email/password and Google login

### Tasks:

1. Create Firebase project and get configuration
2. Set up Firebase config in `src/lib/firebase.ts`
3. Create authentication service with login, signup, logout functions
4. Build auth slice in Redux to manage auth state
5. Create `.env.local` for Firebase credentials
6. Add environment variables to `.gitignore`

**Files to create:**

- `src/lib/firebase.ts`
- `src/services/authService.ts`
- `.env.local`
- Update `src/store/slices/authSlice.ts`

---

## Module 6: Auth UI Components (2-3 hours)

**Goal:** Build login, signup, and Google auth UI components

### Tasks:

1. Install shadcn/ui components: Button, Input, Card, Label, Form
2. Create Login form component with validation
3. Create Signup form component with validation
4. Add Google Sign-In button component
5. Create auth pages: `/login`, `/signup`
6. Implement form error handling and loading states

**Files to create:**

- `src/components/auth/LoginForm.tsx`
- `src/components/auth/SignupForm.tsx`
- `src/components/auth/GoogleSignInButton.tsx`
- `src/app/login/page.tsx`
- `src/app/signup/page.tsx`

---

## Module 7: Role-Based Access Control (RBAC) (2-3 hours)

**Goal:** Implement buyer/seller roles using Firebase custom claims

### Tasks:

1. Create role types (buyer, seller, admin)
2. Set up Firebase Cloud Functions for setting custom claims (or admin SDK)
3. Create role-checking utilities and hooks
4. Implement protected route wrapper component
5. Create role-based navigation logic

**Files to create:**

- `src/types/roles.ts`
- `src/hooks/useRole.ts`
- `src/components/ProtectedRoute.tsx`
- `src/middleware.ts` (Next.js middleware for route protection)

---

## Module 8: Navigation & Layout Components (2 hours)

**Goal:** Build responsive header, footer, and navigation with role-based menus

### Tasks:

1. Install shadcn/ui: NavigationMenu, DropdownMenu, Avatar
2. Create Header component with logo, search bar, cart icon, user menu
3. Create Footer component with links
4. Implement mobile-responsive navigation (hamburger menu)
5. Add role-based menu items (Buyer Dashboard vs Seller Dashboard)

**Files to create:**

- `src/components/layout/Header.tsx`
- `src/components/layout/Footer.tsx`
- `src/components/layout/MobileNav.tsx`
- `src/components/layout/UserMenu.tsx`
- Update `src/app/layout.tsx`

---

## Module 9: Product Filters & Sorting (Redux Integration) (2-3 hours)

**Goal:** Implement client-side filtering and sorting with Redux

### Tasks:

1. Complete filters slice with actions (category, price range, rating, search)
2. Create Filter sidebar component with shadcn/ui Slider, Checkbox, Select
3. Implement sort dropdown (price, rating, newest)
4. Connect filters to products display with Redux selectors
5. Add "Clear Filters" functionality

**Files to create:**

- Update `src/store/slices/filtersSlice.ts`
- `src/components/products/FilterSidebar.tsx`
- `src/components/products/SortDropdown.tsx`
- `src/components/products/ProductsGrid.tsx`

---

## Module 10: Shopping Cart Functionality (2-3 hours)

**Goal:** Build cart with Redux and localStorage persistence

### Tasks:

1. Complete cart slice with actions (add, remove, update quantity, clear)
2. Implement localStorage middleware for cart persistence
3. Create Cart drawer/modal component with shadcn/ui Sheet
4. Build CartItem component with quantity controls
5. Display cart total and item count in header

**Files to create:**

- Update `src/store/slices/cartSlice.ts`
- `src/store/middleware/cartMiddleware.ts`
- `src/components/cart/CartDrawer.tsx`
- `src/components/cart/CartItem.tsx`
- `src/components/cart/CartIcon.tsx`

---

## Module 11: Product Details Page (2 hours)

**Goal:** Create detailed product view with add-to-cart functionality

### Tasks:

1. Create dynamic route `src/app/products/[id]/page.tsx`
2. Fetch product by ID using React Query
3. Build product image gallery component
4. Add product info section (title, price, description, rating)
5. Implement add-to-cart button with quantity selector
6. Add breadcrumb navigation

**Files to create:**

- `src/app/products/[id]/page.tsx`
- `src/components/product/ProductImageGallery.tsx`
- `src/components/product/ProductInfo.tsx`
- `src/components/ui/Breadcrumb.tsx`

---

## Module 12: Virtualization for Product Lists (2 hours)

**Goal:** Optimize large product lists with react-window

### Tasks:

1. Install react-window and @types/react-window
2. Create virtualized grid component for products
3. Implement dynamic row height calculation
4. Add scroll-to-top functionality
5. Test performance with large datasets (100+ products)

**Files to create:**

- `src/components/products/VirtualizedProductGrid.tsx`
- `src/hooks/useVirtualization.ts`

---

## Module 13: Image Optimization & Lazy Loading (1-2 hours)

**Goal:** Implement next/image with lazy loading and intersection observer

### Tasks:

1. Replace all img tags with next/image
2. Configure image domains in `next.config.ts`
3. Add blur placeholders for images
4. Implement intersection observer for below-fold images
5. Optimize image sizes and formats (WebP)

**Files to modify:**

- `next.config.ts`
- All components using images
- `src/components/OptimizedImage.tsx` (wrapper component)

---

## Module 14: Code Splitting & Dynamic Imports (1-2 hours)

**Goal:** Implement lazy loading for heavy components

### Tasks:

1. Identify heavy components (cart, filters, modals)
2. Use next/dynamic for lazy loading
3. Add loading skeletons with shadcn/ui Skeleton
4. Implement route-based code splitting
5. Analyze bundle size with Next.js build analyzer

**Files to modify:**

- Components using dynamic imports
- `src/components/ui/LoadingSkeleton.tsx`
- `package.json` (add bundle analyzer)

---

## Module 15: Checkout Flow - Part 1 (UI) (2 hours)

**Goal:** Build checkout page UI with form validation

### Tasks:

1. Create checkout page at `src/app/checkout/page.tsx`
2. Build multi-step form (shipping, payment, review)
3. Install shadcn/ui Form components with React Hook Form
4. Implement form validation with Zod
5. Create order summary component

**Files to create:**

- `src/app/checkout/page.tsx`
- `src/components/checkout/ShippingForm.tsx`
- `src/components/checkout/PaymentForm.tsx`
- `src/components/checkout/OrderSummary.tsx`
- `src/lib/validations/checkout.ts` (Zod schemas)

---

## Module 16: Firestore Schema Design & Setup (2-3 hours)

**Goal:** Design and implement Firestore database structure

### Tasks:

1. Design collections: users, sellers, products, orders, reviews
2. Create Firestore initialization in Firebase config
3. Set up Firestore security rules
4. Create TypeScript interfaces for all collections
5. Build CRUD utility functions for Firestore operations

**Files to create:**

- `firestore.rules`
- `src/types/firestore.ts`
- `src/services/firestoreService.ts`
- `src/lib/firestore.ts`

---

## Module 17: Seller Registration & Profile (2-3 hours)

**Goal:** Allow users to register as sellers with profile setup

### Tasks:

1. Create seller registration form
2. Build seller profile page with business details
3. Store seller data in Firestore `sellers` collection
4. Update user role to 'seller' in Firebase custom claims
5. Create seller profile edit functionality

**Files to create:**

- `src/app/seller/register/page.tsx`
- `src/app/seller/profile/page.tsx`
- `src/components/seller/SellerRegistrationForm.tsx`
- `src/components/seller/SellerProfileForm.tsx`

---

## Module 18: Seller Dashboard Layout (2 hours)

**Goal:** Create seller dashboard with sidebar navigation

### Tasks:

1. Install shadcn/ui Sidebar component
2. Build seller dashboard layout with navigation
3. Create dashboard routes: overview, products, orders, analytics
4. Implement responsive sidebar (collapsible on mobile)
5. Add seller-only route protection

**Files to create:**

- `src/app/seller/dashboard/layout.tsx`
- `src/components/seller/DashboardSidebar.tsx`
- `src/app/seller/dashboard/page.tsx` (overview)

---

## Module 19: Product CRUD - Part 1 (Create & List) (2-3 hours)

**Goal:** Allow sellers to add and view their products

### Tasks:

1. Create "Add Product" form with image upload
2. Set up Firebase Storage for product images
3. Save products to Firestore with seller reference
4. Build seller products list page
5. Implement product search and filtering for sellers

**Files to create:**

- `src/app/seller/dashboard/products/page.tsx`
- `src/app/seller/dashboard/products/new/page.tsx`
- `src/components/seller/ProductForm.tsx`
- `src/services/storageService.ts`
- `src/hooks/useSellerProducts.ts`

---

## Module 20: Product CRUD - Part 2 (Edit & Delete) (2 hours)

**Goal:** Complete product management with edit and delete

### Tasks:

1. Create edit product page with pre-filled form
2. Implement update product functionality
3. Add delete product with confirmation dialog
4. Handle image replacement in Firebase Storage
5. Add product status toggle (active/inactive)

**Files to create:**

- `src/app/seller/dashboard/products/[id]/edit/page.tsx`
- `src/components/seller/DeleteProductDialog.tsx`
- Update `src/services/storageService.ts`

---

## Module 21: Orders Management for Sellers (2-3 hours)

**Goal:** Display and manage orders for seller's products

### Tasks:

1. Create orders collection structure in Firestore
2. Build seller orders page with filtering (pending, shipped, delivered)
3. Implement order status update functionality
4. Create order details view
5. Add order search and date range filtering

**Files to create:**

- `src/app/seller/dashboard/orders/page.tsx`
- `src/app/seller/dashboard/orders/[id]/page.tsx`
- `src/components/seller/OrdersList.tsx`
- `src/components/seller/OrderStatusBadge.tsx`
- `src/hooks/useSellerOrders.ts`

---

## Module 22: Seller Analytics Dashboard (2-3 hours)

**Goal:** Build analytics with ApexCharts showing sales, revenue, and trends

### Tasks:

1. Install ApexCharts and react-apexcharts
2. Create analytics data aggregation functions
3. Build revenue chart (line chart - daily/weekly/monthly)
4. Create sales by category chart (pie/doughnut chart)
5. Add key metrics cards (total sales, revenue, orders)
6. Implement date range selector for analytics

**Files to create:**

- `src/app/seller/dashboard/analytics/page.tsx`
- `src/components/seller/RevenueChart.tsx`
- `src/components/seller/SalesByCategoryChart.tsx`
- `src/components/seller/MetricsCard.tsx`
- `src/hooks/useSellerAnalytics.ts`
- `src/utils/analyticsCalculations.ts`

---

## Module 23: Buyer Dashboard & Order History (2 hours)

**Goal:** Create buyer dashboard to view order history and track orders

### Tasks:

1. Create buyer dashboard layout
2. Build order history page with status tracking
3. Implement order details view for buyers
4. Add order cancellation functionality (if pending)
5. Create order tracking timeline component

**Files to create:**

- `src/app/buyer/dashboard/page.tsx`
- `src/app/buyer/dashboard/orders/page.tsx`
- `src/app/buyer/dashboard/orders/[id]/page.tsx`
- `src/components/buyer/OrderHistory.tsx`
- `src/components/buyer/OrderTrackingTimeline.tsx`

---

## Module 24: Wishlist Feature (2 hours)

**Goal:** Allow buyers to save products to wishlist

### Tasks:

1. Create wishlist slice in Redux
2. Store wishlist in Firestore per user
3. Add wishlist button to product cards and details page
4. Build wishlist page to view saved products
5. Implement remove from wishlist functionality

**Files to create:**

- `src/store/slices/wishlistSlice.ts`
- `src/app/buyer/dashboard/wishlist/page.tsx`
- `src/components/wishlist/WishlistButton.tsx`
- `src/hooks/useWishlist.ts`

---

## Module 25: Product Reviews & Ratings (2-3 hours)

**Goal:** Implement review system for products

### Tasks:

1. Create reviews collection in Firestore
2. Build review form component with star rating
3. Display reviews on product details page
4. Calculate and display average rating
5. Implement review filtering and sorting
6. Add review moderation (seller can respond)

**Files to create:**

- `src/components/reviews/ReviewForm.tsx`
- `src/components/reviews/ReviewsList.tsx`
- `src/components/reviews/StarRating.tsx`
- `src/hooks/useReviews.ts`
- Update `src/app/products/[id]/page.tsx`

---

## Module 26: Replace Fake API with Firestore (2 hours)

**Goal:** Migrate from Fake Store API to Firestore for products

### Tasks:

1. Update product fetching hooks to use Firestore
2. Implement Firestore pagination with React Query
3. Update filters to work with Firestore queries
4. Add Firestore indexes for optimized queries
5. Test all product-related features with Firestore

**Files to modify:**

- `src/hooks/useProducts.ts`
- `src/hooks/useProductById.ts`
- `src/services/firestoreService.ts`
- `firestore.indexes.json`

---

## Module 27: Stripe Integration - Setup (2 hours)

**Goal:** Set up Stripe for payment processing in test mode

### Tasks:

1. Create Stripe account and get API keys
2. Install Stripe SDK and @stripe/stripe-js
3. Set up Stripe environment variables
4. Create Stripe service for payment intents
5. Build API route for creating payment intent

**Files to create:**

- `src/lib/stripe.ts`
- `src/app/api/create-payment-intent/route.ts`
- Update `.env.local` with Stripe keys

---

## Module 28: Stripe Integration - Checkout (2-3 hours)

**Goal:** Complete checkout with Stripe payment

### Tasks:

1. Install Stripe Elements components
2. Build payment form with card input
3. Implement payment confirmation flow
4. Create order in Firestore after successful payment
5. Send order confirmation (console log for now)
6. Clear cart after successful order

**Files to modify:**

- `src/components/checkout/PaymentForm.tsx`
- `src/app/checkout/page.tsx`
- Create `src/app/checkout/success/page.tsx`
- Create `src/app/checkout/cancel/page.tsx`

---

## Module 29: Dark/Light Mode Toggle (1-2 hours)

**Goal:** Implement theme switching with persistence

### Tasks:

1. Install next-themes package
2. Create ThemeProvider wrapper
3. Build theme toggle component with shadcn/ui Switch
4. Add theme toggle to header
5. Test all components in both themes
6. Store theme preference in localStorage

**Files to create:**

- `src/providers/ThemeProvider.tsx`
- `src/components/ThemeToggle.tsx`
- Update `src/app/layout.tsx`

---

## Module 30: SEO Optimization (2 hours)

**Goal:** Implement SEO best practices with Next.js metadata API

### Tasks:

1. Add metadata to all pages using Next.js 15 Metadata API
2. Implement dynamic metadata for product pages
3. Add OpenGraph tags for social sharing
4. Create sitemap.xml and robots.txt
5. Add structured data (JSON-LD) for products
6. Implement canonical URLs

**Files to create:**

- `src/app/sitemap.ts`
- `src/app/robots.ts`
- Update metadata in all page.tsx files
- `src/utils/generateStructuredData.ts`

---

## Module 31: SSR & SSG Implementation (2 hours)

**Goal:** Optimize pages with Server-Side Rendering and Static Generation

### Tasks:

1. Implement SSG for product listing page with revalidation
2. Use SSR for product details pages
3. Implement Incremental Static Regeneration (ISR)
4. Add loading.tsx files for streaming UI
5. Test SEO improvements with Lighthouse

**Files to create:**

- `src/app/products/loading.tsx`
- `src/app/products/[id]/loading.tsx`
- Update page components with proper data fetching

---

## Module 32: Search Functionality (2-3 hours)

**Goal:** Implement global search with autocomplete

### Tasks:

1. Create search API route or use Firestore text search
2. Build search input component with autocomplete dropdown
3. Implement debounced search with React Query
4. Create search results page
5. Add search history (localStorage)
6. Highlight search terms in results

**Files to create:**

- `src/components/search/SearchBar.tsx`
- `src/components/search/SearchAutocomplete.tsx`
- `src/app/search/page.tsx`
- `src/hooks/useSearch.ts`

---

## Module 33: Notifications System (2 hours)

**Goal:** Add toast notifications for user actions

### Tasks:

1. Install shadcn/ui Toast component
2. Create notification context/provider
3. Add success notifications (add to cart, order placed)
4. Add error notifications (payment failed, auth errors)
5. Implement notification queue for multiple toasts

**Files to create:**

- `src/providers/NotificationProvider.tsx`
- `src/hooks/useNotification.ts`
- Update components to use notifications

---

## Module 34: Loading States & Skeletons (1-2 hours)

**Goal:** Improve UX with loading skeletons

### Tasks:

1. Create skeleton components for products, cards, lists
2. Add loading states to all data-fetching components
3. Implement suspense boundaries
4. Add shimmer effect to skeletons
5. Test loading states by throttling network

**Files to create:**

- `src/components/skeletons/ProductCardSkeleton.tsx`
- `src/components/skeletons/ProductDetailsSkeleton.tsx`
- `src/components/skeletons/DashboardSkeleton.tsx`

---

## Module 35: Error Handling & Error Boundaries (1-2 hours)

**Goal:** Implement comprehensive error handling

### Tasks:

1. Create error.tsx files for route-level error handling
2. Build custom error boundary component
3. Create 404 not-found page
4. Add error logging service (console for now)
5. Implement retry logic for failed requests

**Files to create:**

- `src/app/error.tsx`
- `src/app/not-found.tsx`
- `src/components/ErrorBoundary.tsx`
- `src/utils/errorLogger.ts`

---

## Module 36: Web Vitals Optimization (2-3 hours)

**Goal:** Optimize Core Web Vitals (LCP, CLS, FID/INP)

### Tasks:

1. Run Lighthouse audit and identify issues
2. Optimize LCP (largest contentful paint) - preload critical images
3. Minimize CLS (cumulative layout shift) - add dimensions to images
4. Optimize FID/INP - reduce JavaScript execution time
5. Add web-vitals reporting
6. Achieve target: CLS < 0.1, LCP < 2.5s

**Files to create:**

- `src/app/web-vitals.ts`
- Update `next.config.ts` with performance optimizations

---

## Module 37: Responsive Design Polish (2 hours)

**Goal:** Ensure perfect responsive design across all devices

### Tasks:

1. Test all pages on mobile, tablet, desktop
2. Fix layout issues and improve mobile navigation
3. Optimize touch targets for mobile (min 44x44px)
4. Add mobile-specific optimizations (bottom nav, swipe gestures)
5. Test on real devices or browser dev tools

**Files to modify:**

- All component files for responsive fixes
- Add mobile-specific components if needed

---

## Module 38: Accessibility (A11y) Improvements (2 hours)

**Goal:** Ensure WCAG 2.1 AA compliance

### Tasks:

1. Add proper ARIA labels to interactive elements
2. Ensure keyboard navigation works everywhere
3. Add focus indicators and skip-to-content link
4. Test with screen reader (NVDA/JAWS)
5. Fix color contrast issues (use contrast checker)
6. Add alt text to all images

**Files to modify:**

- All component files for a11y improvements

---

## Module 39: Testing Setup (2-3 hours)

**Goal:** Set up basic testing infrastructure

### Tasks:

1. Install Jest and React Testing Library
2. Configure Jest for Next.js
3. Write unit tests for Redux slices
4. Write component tests for critical components
5. Add test scripts to package.json

**Files to create:**

- `jest.config.js`
- `jest.setup.js`
- `src/__tests__/` directory with test files

---

## Module 40: Environment Configuration & Deployment (2-3 hours)

**Goal:** Deploy to Vercel with proper environment setup

### Tasks:

1. Create production Firebase project
2. Set up environment variables in Vercel
3. Configure Vercel deployment settings
4. Set up custom domain (optional)
5. Test production build locally
6. Deploy to Vercel and verify all features work
7. Set up continuous deployment from GitHub

**Files to create:**

- `.env.production`
- `vercel.json` (if needed)
- Update README with deployment instructions

---

## Module 41: Documentation & Final Polish (2 hours)

**Goal:** Complete project documentation and final touches

### Tasks:

1. Update README with project overview, setup instructions, features
2. Add inline code comments for complex logic
3. Create API documentation for Firestore structure
4. Add screenshots to README
5. Create CONTRIBUTING.md (if open source)
6. Final code cleanup and remove console.logs

**Files to create/modify:**

- `README.md`
- `CONTRIBUTING.md`
- `docs/` directory with additional documentation

---

## Resume-Worthy Highlights

After completing this project, you can showcase:

1. **Dynamic Component Architecture:** Built reusable, composable React components with TypeScript for scalability
2. **State Management Mastery:** Implemented Redux Toolkit for client state and React Query for server state with optimized caching strategies
3. **Performance Optimization:** Achieved Core Web Vitals targets (CLS < 0.1, LCP < 2.5s) through virtualization, lazy loading, code splitting, and image optimization
4. **Payment Integration:** Integrated Stripe payment gateway in test mode for secure checkout
5. **Responsive UI/UX:** Designed mobile-first, accessible interface with dark/light mode and intuitive navigation
6. **Multi-Vendor Architecture:** Built scalable marketplace where each seller manages independent product catalogs and analytics
7. **Real-time Analytics:** Implemented interactive dashboards with ApexCharts for seller insights
8. **Firebase Full-Stack:** Leveraged Firebase Auth, Firestore, and Storage for complete backend solution
9. **SEO & Performance:** Implemented SSR/SSG with Next.js for optimal search engine visibility
10. **Production-Ready:** Deployed scalable application on Vercel with CI/CD pipeline

---

## Estimated Timeline

- **Total Modules:** 41 micro-modules
- **Time per Module:** 1-3 hours
- **Total Estimated Time:** 75-100 hours
- **Recommended Pace:** 2-3 modules per day = 3-4 weeks to completion

## Learning Path Order

Follow the modules sequentially as they build upon each other. Each module is designed to be completed in one focused session, allowing you to learn incrementally while building a production-quality application.

### To-dos

- [ ] Module 1: Development Environment Setup (Prettier, Husky, git hooks)
- [ ] Module 2: Fake Store API Integration & Basic Product Listing
- [ ] Module 3: Redux Toolkit Store Setup
- [ ] Module 4: React Query Setup & Integration
- [ ] Module 5: Firebase Authentication Setup
- [ ] Module 6: Auth UI Components (Login, Signup, Google)
- [ ] Module 7: Role-Based Access Control (RBAC)
- [ ] Module 8: Navigation & Layout Components
- [ ] Module 9: Product Filters & Sorting (Redux Integration)
- [ ] Module 10: Shopping Cart Functionality