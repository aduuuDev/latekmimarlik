// Utility function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

// Mock data for services
export const servicesData = [
  {
    id: 1,
    title: "Planning",
    get slug() {
      return generateSlug(this.title);
    },
    description:
      "Our master plans provide a comprehensive look at where an organization is today.",
    detailContent: {
      description:
        "Our comprehensive planning services help organizations define their future direction and create actionable roadmaps for success.",
      content: `
        <p>Our master plans provide a comprehensive look at where an organization is today, where it wants to be in the future, and how it will get there. We work closely with our clients to understand their unique challenges and opportunities.</p>
        
        <h3>Our Planning Process</h3>
        <ul>
          <li>Initial consultation and needs assessment</li>
          <li>Market research and competitive analysis</li>
          <li>Strategic goal setting and timeline development</li>
          <li>Resource allocation and budget planning</li>
          <li>Implementation roadmap creation</li>
          <li>Ongoing monitoring and adjustment</li>
        </ul>
        
        <p>Whether you're planning a new construction project, renovating an existing space, or developing a long-term facilities strategy, our planning services ensure your project succeeds from concept to completion.</p>
      `,
      image: "https://picsum.photos/seed/blog-modern-arch/600/400",
    },
  },
  {
    id: 2,
    title: "Interior",
    get slug() {
      return generateSlug(this.title);
    },
    description:
      "You may engage your architect to provide an interior design service, advising on loose furniture.",
    detailContent: {
      title: "Interior Design Excellence",
      description:
        "Transform your space with our comprehensive interior design services that blend functionality with aesthetic beauty.",
      content: `
        <p>You may engage your architect to provide an interior design service, advising on loose furniture, fixtures, and fittings. Our interior design team creates spaces that are not only beautiful but also functional and sustainable.</p>
        
        <h3>Interior Design Services</h3>
        <ul>
          <li>Space planning and layout optimization</li>
          <li>Color scheme and material selection</li>
          <li>Furniture and fixture specification</li>
          <li>Lighting design and implementation</li>
          <li>Custom millwork and built-in solutions</li>
          <li>Project management and installation</li>
        </ul>
        
        <p>From residential homes to commercial offices, our interior design approach focuses on creating environments that enhance the way people live and work while reflecting their personal style and brand identity.</p>
      `,
      image: "/img/services/interior-detail.jpg",
    },
  },
  {
    id: 3,
    title: "Exterior",
    get slug() {
      return generateSlug(this.title);
    },
    description:
      "Working together with your architect, you will share your project needs, dreams and goals.",
    detailContent: {
      title: "Exterior Design & Architecture",
      description:
        "Create stunning exterior spaces that make a lasting impression while providing functional outdoor environments.",
      content: `
        <p>Working together with your architect, you will share your project needs, dreams and goals. Our exterior design services encompass everything from building facades to landscape architecture, creating cohesive outdoor environments.</p>
        
        <h3>Exterior Design Expertise</h3>
        <ul>
          <li>Architectural facade design</li>
          <li>Landscape architecture and planning</li>
          <li>Outdoor living space creation</li>
          <li>Material selection and weatherproofing</li>
          <li>Sustainable design solutions</li>
          <li>Code compliance and permitting</li>
        </ul>
        
        <p>Our exterior design philosophy emphasizes the relationship between buildings and their surrounding environment, creating spaces that are both visually striking and environmentally responsible.</p>
      `,
      image: "/img/services/exterior-detail.jpg",
    },
  },
  {
    id: 4,
    title: "Sustainability",
    get slug() {
      return generateSlug(this.title);
    },
    description:
      "We help organizations develop sustainable solutions that reduce environmental impact.",
    detailContent: {
      title: "Sustainable Design Solutions",
      description:
        "Our sustainability experts guide your projects to meet eco-friendly standards while optimizing performance and cost.",
      content: `
        <p>We help organizations develop sustainable solutions that reduce environmental impact and meet evolving regulatory requirements. Our approach integrates green strategies from the earliest design stages.</p>
        
        <h3>Sustainability Services</h3>
        <ul>
          <li>Green building certification (LEED, BREEAM, etc.)</li>
          <li>Energy efficiency and renewable integration</li>
          <li>Water conservation and reuse systems</li>
          <li>Eco-friendly materials selection</li>
          <li>Carbon footprint analysis</li>
          <li>Lifecycle cost analysis</li>
        </ul>
        
        <p>Our designs focus on creating buildings and spaces that minimize environmental impact, lower operational costs, and enhance occupant well-being.</p>
      `,
      image: "/img/services/sustainability-detail.jpg",
    },
  },
  {
    id: 5,
    title: "Project Management",
    get slug() {
      return generateSlug(this.title);
    },
    description:
      "We ensure your project is delivered on time, within scope, and on budget through expert project management.",
    detailContent: {
      title: "Comprehensive Project Management",
      description:
        "From concept to completion, we coordinate all phases of your project, ensuring seamless communication and efficient execution.",
      content: `
        <p>We offer complete project management services that align every stakeholder and activity toward a successful outcome. Our experienced team monitors timelines, budgets, and quality to ensure smooth delivery.</p>
        
        <h3>Project Management Scope</h3>
        <ul>
          <li>Schedule development and tracking</li>
          <li>Budget control and financial reporting</li>
          <li>Risk management and mitigation</li>
          <li>Vendor coordination and contract oversight</li>
          <li>Quality control and inspection</li>
          <li>Stakeholder communication</li>
        </ul>
        
        <p>Our commitment is to take the stress out of your project, so you can focus on the big picture while we manage the day-to-day details.</p>
      `,
      image: "/img/services/project-management-detail.jpg",
    },
  },
  {
    id: 6,
    title: "Consulting",
    get slug() {
      return generateSlug(this.title);
    },
    description:
      "Gain expert insight into your design or construction process with our consulting services.",
    detailContent: {
      title: "Architecture & Design Consulting",
      description:
        "Our consulting services help clients make informed decisions, mitigate risks, and optimize design outcomes.",
      content: `
        <p>Whether you're exploring a new venture or troubleshooting an ongoing project, our consultants provide critical analysis and creative problem-solving to support your goals.</p>
        
        <h3>Consulting Expertise</h3>
        <ul>
          <li>Feasibility studies and site evaluations</li>
          <li>Design critique and value engineering</li>
          <li>Building code and zoning review</li>
          <li>Construction document assessment</li>
          <li>Procurement strategy guidance</li>
          <li>Owner representation and advisory</li>
        </ul>
        
        <p>We bring a fresh perspective, backed by years of industry experience, to help you achieve clarity and confidence in every decision.</p>
      `,
      image: "/img/services/consulting-detail.jpg",
    },
  },
];

// Helper function to get service by slug
export const getServiceBySlug = (slug) => {
  return servicesData.find((service) => service.slug === slug);
};

// Helper function to generate slug from title (exported for use in other components)
export { generateSlug };

// Helper function to get all services
export const getAllServices = () => {
  return servicesData;
};

export const getRecentServices = (limit = 3) => {
  return servicesData.slice(0, limit);
};

// Mock data for projects
export const projectsData = [
  {
    id: 1,
    title: "Modern Villa Project",
    slug: "modern-villa-project",
    category: "Residential",
    location: "Istanbul, Turkey",
    year: "2023",
    client: "Private Client",
    area: "450 m²",
    architectInCharge: "John Doe",
    description: "A modern villa with minimalist design and sustainable features, designed to blend with its natural surroundings.",
    content: `
      <p>This modern villa project represents our approach to contemporary residential architecture. Designed with clean lines and an open plan, the villa maximizes natural light while maintaining privacy.</p>
      
      <h3>Design Philosophy</h3>
      <p>Our design philosophy focused on creating a seamless integration between indoor and outdoor living spaces. Large windows and sliding glass doors open to a landscaped garden, blurring the boundaries between interior and exterior.</p>
      
      <h3>Sustainable Features</h3>
      <ul>
        <li>Solar panel integration on the roof</li>
        <li>Rainwater harvesting system</li>
        <li>High-efficiency insulation materials</li>
        <li>Smart home technology for energy management</li>
      </ul>
      
      <p>The material palette includes exposed concrete, wood, and glass, creating a warm yet contemporary aesthetic that ages beautifully over time.</p>
    `,
    images: [
      "/img/projects/modern-villa/image1.jpg",
      "/img/projects/modern-villa/image2.jpg",
      "/img/projects/modern-villa/image3.jpg"
    ],
    coverImage: "/img/projects/modern-villa/cover.jpg",
    isActive: true,
    isFeatured: true
  },
  {
    id: 2,
    title: "Urban Office Complex",
    slug: "urban-office-complex",
    category: "Commercial",
    location: "Ankara, Turkey",
    year: "2022",
    client: "TechCorp Inc.",
    area: "12,000 m²",
    architectInCharge: "Sarah Johnson",
    description: "A contemporary office complex designed to foster collaboration and creativity in an urban setting.",
    content: `
      <p>This urban office complex was designed to meet the evolving needs of modern businesses. The design prioritizes flexible workspaces, collaboration areas, and employee well-being.</p>
      
      <h3>Workspace Design</h3>
      <p>Rather than traditional cubicles, the office features a variety of work settings including focus pods, team tables, and informal meeting areas. Each floor has its own unique layout to accommodate different working styles and department needs.</p>
      
      <h3>Amenities</h3>
      <ul>
        <li>Rooftop garden and outdoor working space</li>
        <li>Fitness center with showers</li>
        <li>Multiple cafes and dining options</li>
        <li>Multi-purpose auditorium</li>
        <li>Meditation and wellness rooms</li>
      </ul>
      
      <p>The facade features a dynamic pattern of glass and metal panels that responds to the building's orientation, providing optimal shading and views while creating a distinctive presence in the urban landscape.</p>
    `,
    images: [
      "/img/projects/office-complex/image1.jpg",
      "/img/projects/office-complex/image2.jpg",
      "/img/projects/office-complex/image3.jpg"
    ],
    coverImage: "/img/projects/office-complex/cover.jpg",
    isActive: true,
    isFeatured: true
  },
  {
    id: 3,
    title: "Cultural Arts Center",
    slug: "cultural-arts-center",
    category: "Cultural",
    location: "Izmir, Turkey",
    year: "2021",
    client: "Izmir Municipality",
    area: "8,500 m²",
    architectInCharge: "Michael Chen",
    description: "A versatile cultural center that houses exhibition spaces, performance venues, and educational facilities.",
    content: `
      <p>The Cultural Arts Center was designed as a hub for artistic expression and community engagement. The building serves as both a showcase for the arts and an incubator for creative development.</p>
      
      <h3>Programmatic Elements</h3>
      <p>The center includes a 500-seat theater, three flexible exhibition galleries, studios for art classes, a digital media lab, and several multipurpose spaces for workshops and community events.</p>
      
      <h3>Design Approach</h3>
      <ul>
        <li>Acoustic engineering for optimal sound performance</li>
        <li>Specialized lighting systems for exhibitions</li>
        <li>Accessible design throughout all spaces</li>
        <li>Indoor-outdoor connections through courtyards</li>
      </ul>
      
      <p>The building's form draws inspiration from traditional Turkish cultural motifs, reinterpreted through a contemporary lens. Materials were chosen for their durability, acoustic properties, and visual warmth.</p>
    `,
    images: [
      "/img/projects/arts-center/image1.jpg",
      "/img/projects/arts-center/image2.jpg",
      "/img/projects/arts-center/image3.jpg"
    ],
    coverImage: "/img/projects/arts-center/cover.jpg",
    isActive: true,
    isFeatured: false
  }
];

// Helper function to get project by slug
export const getProjectBySlug = (slug) => {
  return projectsData.find((project) => project.slug === slug);
};

// Helper function to get all projects
export const getAllProjects = () => {
  return projectsData;
};

export const getFeaturedProjects = () => {
  return projectsData.filter(project => project.isFeatured);
};

// Mock data for blog posts
export const blogData = [
  {
    id: 1,
    title: "Modern Architecture Trends 2024",
    excerpt:
      "Discover the latest trends in modern architecture that are shaping the future of design and construction.",
    content: `
      <p>Modern architecture continues to evolve with new technologies and changing lifestyle needs. In 2024, we're seeing exciting trends that blend sustainability, technology, and human-centric design.</p>
      
      <h3>Key Trends This Year</h3>
      <ul>
        <li>Sustainable and eco-friendly materials</li>
        <li>Smart home integration</li>
        <li>Biophilic design elements</li>
        <li>Flexible multi-purpose spaces</li>
        <li>Minimalist aesthetics with maximum functionality</li>
      </ul>
      
      <p>These trends reflect our growing awareness of environmental responsibility and the need for spaces that adapt to our changing work and lifestyle patterns.</p>
    `,
    image: "https://picsum.photos/seed/blog-modern-arch/800/600",
    author: "John Smith",
    date: "2024-03-15",
    category: "Architecture",
    readTime: "5 min read",
    get slug() {
      return generateSlug(this.title);
    },
  },
  {
    id: 2,
    title: "Sustainable Interior Design Solutions",
    excerpt:
      "Learn how to create beautiful interiors while maintaining environmental consciousness and sustainability.",
    content: `
      <p>Sustainable interior design is no longer a trend—it's a necessity. As we become more aware of our environmental impact, designers are finding creative ways to create beautiful spaces with minimal ecological footprint.</p>
      
      <h3>Sustainable Design Principles</h3>
      <ul>
        <li>Use of recycled and upcycled materials</li>
        <li>Energy-efficient lighting solutions</li>
        <li>Low-VOC paints and finishes</li>
        <li>Locally sourced materials</li>
        <li>Durable, long-lasting furniture</li>
      </ul>
      
      <p>By implementing these principles, we can create spaces that are not only beautiful but also contribute to a healthier planet.</p>
    `,
    image: "https://picsum.photos/seed/blog-sustainable/800/600",
    author: "Emma Wilson",
    date: "2024-03-10",
    category: "Interior Design",
    readTime: "4 min read",
    get slug() {
      return generateSlug(this.title);
    },
  },
  {
    id: 3,
    title: "Smart Home Technology Integration",
    excerpt:
      "Explore how modern technology can be seamlessly integrated into residential and commercial spaces.",
    content: `
      <p>Smart home technology has revolutionized the way we interact with our living and working spaces. From automated lighting to intelligent climate control, technology is making our spaces more comfortable and efficient.</p>
      
      <h3>Popular Smart Home Features</h3>
      <ul>
        <li>Automated lighting and climate control</li>
        <li>Smart security systems</li>
        <li>Voice-controlled assistants</li>
        <li>Energy monitoring systems</li>
        <li>Integrated entertainment systems</li>
      </ul>
      
      <p>The key to successful smart home integration is balancing functionality with aesthetics, ensuring technology enhances rather than dominates the space.</p>
    `,
    image: "https://picsum.photos/seed/blog-smart-home/800/600",
    author: "Michael Brown",
    date: "2024-03-05",
    category: "Technology",
    readTime: "6 min read",
    get slug() {
      return generateSlug(this.title);
    },
  },
  {
    id: 4,
    title: "Outdoor Living Space Design",
    excerpt:
      "Transform your outdoor areas into functional living spaces that extend your home's comfort and style.",
    content: `
      <p>Outdoor living spaces have become an essential extension of our homes. Whether it's a small balcony or a large backyard, these areas offer opportunities to connect with nature while maintaining comfort and style.</p>
      
      <h3>Design Elements for Outdoor Spaces</h3>
      <ul>
        <li>Weather-resistant furniture and materials</li>
        <li>Outdoor lighting for ambiance</li>
        <li>Plants and landscaping for privacy</li>
        <li>Fire features for year-round use</li>
        <li>Outdoor kitchen and dining areas</li>
      </ul>
      
      <p>By thoughtfully designing outdoor spaces, we can create seamless transitions between indoor and outdoor living.</p>
    `,
    image: "https://picsum.photos/seed/blog-outdoor/800/600",
    author: "Sarah Johnson",
    date: "2024-02-28",
    category: "Outdoor Design",
    readTime: "5 min read",
    get slug() {
      return generateSlug(this.title);
    },
  },
];

// Helper function to get blog post by slug
export const getBlogBySlug = (slug) => {
  return blogData.find((blog) => blog.slug === slug);
};

// Helper function to get all blog posts
export const getAllBlogs = () => {
  return blogData;
};

// Helper function to get recent blog posts (limit)
export const getRecentBlogs = (limit = 4) => {
  return blogData.slice(0, limit);
};

export const projectData = [
  {
    id: 1,
    year: 2010,
    category: "House",
    location: "Dubai, UAE",
    title: "Seascape Villa",
    image: "/img/home/51f1b143659493.57f77d5c9619a.jpg",
    excerpt:
      "The Seascape Villas project constitutes one of the first urban interventions...",
    slug: "seascape-villa",
  },
  {
    id: 2,
    year: 2009,
    category: "Cultural",
    location: "Strasbourg, France",
    title: "European Lard Station",
    image: "/img/home/e55f0243174379.57e5b1bdd7939-e1492696696110.jpg",
    excerpt:
      "Headquarters of the European Parliament including a 750-seat hemicycle...",
    slug: "european-lard-station",
  },
  {
    id: 3,
    year: 2012,
    category: "Residental",
    location: "Paris, France",
    title: "Yabroudi Villa",
    image: "/img/home/8a1f5243879223.jpg",
    excerpt:
      "Calm, quiet areas designed for family life and reception areas...",
    slug: "yabroudi-villa",
  },
  {
    id: 4,
    year: 2013,
    category: "Cultural",
    location: "Muscat, Oman",
    title: "Cultural Complex Centre",
    image: "/img/home/67162a45076555.58260565e42a0.jpg",
    excerpt:
      "Cultural Centre emerges from a unique landscape between sea and mountains...",
    slug: "cultural-complex-centre",
  },
  {
    id: 5,
    year: 2011,
    category: "House",
    location: "Guangzhou, China",
    title: "Dalbourne Villa",
    image: "/img/home/57c8b543253643.57e957e02ae33.jpg",
    excerpt:
      "Located in the northern part of Guangzhou near Bai Yun mountain...",
    slug: "dalbourne-villa",
  },
  {
    id: 6,
    year: 2015,
    category: "Hotel",
    location: "Amman, Jordan",
    title: "Amman Rotana Hotel",
    image: "/img/home/c5854644221919.580bb620ecb87.jpg",
    excerpt: "54-room hotel with restaurants, spa, fitness centre and more...",
    slug: "amman-rotana-hotel",
  },
];

// Helper function to get all simple projects
export const getAllSimpleProjects = () => {
  return projectData;
};

// Helper function to get simple project by slug
export const getSimpleProjectBySlug = (slug) => {
  return projectData.find((project) => project.slug === slug);
};

// Helper function to get recent simple projects (limit)
export const getRecentSimpleProjects = (limit = 6) => {
  return projectData.slice(0, limit);
};
