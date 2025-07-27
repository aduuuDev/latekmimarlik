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
    image: "https://picsum.photos/seed/seascape-villa/800/600",
    excerpt:
      "The Seascape Villas project constitutes one of the first urban interventions...",
    description:
      "The Seascape Villas project constitutes one of the first urban interventions in the new Dubai Waterfront development. The project consists of 15 luxury villas, each with its own private beach access and stunning views of the Arabian Gulf. The design emphasizes the connection between indoor and outdoor living spaces, with large glass facades that open onto private terraces and infinity pools.",
    slug: "seascape-villa",
    gallery: [
      "https://picsum.photos/seed/seascape-villa-1/800/600",
      "https://picsum.photos/seed/seascape-villa-2/800/600",
    ],
  },
  {
    id: 2,
    year: 2009,
    category: "Cultural",
    location: "Strasbourg, France",
    title: "European Lard Station",
    image: "https://picsum.photos/seed/european-station/800/600",
    excerpt:
      "Headquarters of the European Parliament including a 750-seat hemicycle...",
    description:
      "The European Parliament headquarters in Strasbourg represents a landmark architectural achievement that combines functionality with symbolic significance. The complex includes a 750-seat hemicycle for parliamentary sessions, extensive office spaces for MEPs and staff, and public areas designed to reflect the democratic values of the European Union. The building's design emphasizes transparency and accessibility, with glass facades that allow citizens to observe the democratic process.",
    slug: "european-lard-station",
    gallery: [
      "https://picsum.photos/seed/european-station-1/800/600",
      "https://picsum.photos/seed/european-station-2/800/600",
    ],
  },
  {
    id: 3,
    year: 2012,
    category: "Residental",
    location: "Paris, France",
    title: "Yabroudi Villa",
    image: "https://picsum.photos/seed/yabroudi-villa/800/600",
    excerpt:
      "Calm, quiet areas designed for family life and reception areas...",
    description:
      "The Yabroudi Villa in Paris exemplifies modern residential architecture that prioritizes family living while maintaining elegant design principles. The villa features calm, quiet areas designed for family life and reception areas that can accommodate large gatherings. The design seamlessly integrates indoor and outdoor spaces, with a focus on natural light and sustainable materials. The villa's layout promotes both privacy and social interaction, creating a perfect balance for modern family living.",
    slug: "yabroudi-villa",
    gallery: [
      "https://picsum.photos/seed/yabroudi-villa-1/800/600",
      "https://picsum.photos/seed/yabroudi-villa-2/800/600",
    ],
  },
  {
    id: 4,
    year: 2013,
    category: "Cultural",
    location: "Muscat, Oman",
    title: "Cultural Complex Centre",
    image: "https://picsum.photos/seed/cultural-complex/800/600",
    excerpt:
      "Cultural Centre emerges from a unique landscape between sea and mountains...",
    description:
      "The Cultural Complex Centre in Muscat emerges from a unique landscape between sea and mountains, creating a harmonious relationship with its natural surroundings. The complex includes performance spaces, exhibition halls, and educational facilities that celebrate Omani culture while providing modern amenities. The architecture draws inspiration from traditional Omani design elements while incorporating contemporary construction techniques and sustainable design principles.",
    slug: "cultural-complex-centre",
    gallery: [
      "https://picsum.photos/seed/cultural-complex-1/800/600",
      "https://picsum.photos/seed/cultural-complex-2/800/600",
    ],
  },
  {
    id: 5,
    year: 2011,
    category: "House",
    location: "Guangzhou, China",
    title: "Dalbourne Villa",
    image: "https://picsum.photos/seed/dalbourne-villa/800/600",
    excerpt:
      "Located in the northern part of Guangzhou near Bai Yun mountain...",
    description:
      "Located in the northern part of Guangzhou near Bai Yun mountain, the Dalbourne Villa represents a fusion of modern architectural principles with traditional Chinese design philosophy. The villa's design emphasizes the connection between architecture and nature, with carefully planned views of the surrounding landscape and mountain vistas. The project demonstrates how contemporary residential architecture can respect and enhance its natural setting while providing luxurious living spaces.",
    slug: "dalbourne-villa",
    gallery: [
      "https://picsum.photos/seed/dalbourne-villa-1/800/600",
      "https://picsum.photos/seed/dalbourne-villa-2/800/600",
    ],
  },
  {
    id: 6,
    year: 2015,
    category: "Hotel",
    location: "Amman, Jordan",
    title: "Amman Rotana Hotel",
    image: "https://picsum.photos/seed/amman-hotel/800/600",
    excerpt: "54-room hotel with restaurants, spa, fitness centre and more...",
    description:
      "The Amman Rotana Hotel is a 54-room luxury hotel that combines contemporary design with traditional Jordanian hospitality. The hotel features multiple restaurants, a comprehensive spa, fitness centre, and conference facilities. The design emphasizes comfort and functionality while creating an atmosphere of luxury and sophistication. The hotel's architecture reflects the cultural heritage of Amman while providing modern amenities for international travelers.",
    slug: "amman-rotana-hotel",
    gallery: [
      "https://picsum.photos/seed/amman-hotel-1/800/600",
      "https://picsum.photos/seed/amman-hotel-2/800/600",
    ],
  },
];

// Helper function to get all projects
export const getAllProjects = () => {
  return projectData;
};

// Helper function to get project by slug
export const getProjectBySlug = (slug) => {
  return projectData.find((project) => project.slug === slug);
};

// Helper function to get recent projects (limit)
export const getRecentProjects = (limit = 6) => {
  return projectData.slice(0, limit);
};
