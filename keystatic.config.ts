import { config, fields, singleton, collection } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    brand: {
      name: 'Dina Yazdani Portfolio CMS',
    },
    navigation: {
      'Profile & About': ['profile', 'researchInterests', 'skills'],
      'Academic & Research': ['education', 'publications', 'services'],
      'Career & Experience': ['experiences', 'awards', 'certificates'],
      'Outreach & Creative': ['community'],
    },
  },
  singletons: {
    profile: singleton({
      label: 'Main Profile & Bio',
      path: 'src/content/profile/index',
      format: 'json',
      schema: {
        name: fields.text({ label: 'Full Name', validation: { isRequired: true } }),
        headline: fields.text({ label: 'Professional Headline', validation: { isRequired: true } }),
        statusBadge: fields.text({ label: 'Status Badge (e.g. Open to PhD & Collaborations)' }),
        location: fields.text({ label: 'Location' }),
        email: fields.text({ label: 'Email' }),
        phone: fields.text({ label: 'Phone' }),
        englishLevel: fields.text({ label: 'English Proficiency' }),
        persianLevel: fields.text({ label: 'Persian Proficiency' }),
        linkedin: fields.url({ label: 'LinkedIn URL' }),
        github: fields.url({ label: 'GitHub URL' }),
        orcid: fields.url({ label: 'ORCID URL' }),
        researchgate: fields.url({ label: 'ResearchGate URL' }),
        bioParagraph1: fields.text({ label: 'Bio Paragraph 1 (Focus & Thesis)', multiline: true }),
        bioParagraph2: fields.text({ label: 'Bio Paragraph 2 (Tools & ML Exploration)', multiline: true }),
        bioParagraph3: fields.text({ label: 'Bio Paragraph 3 (Current Vision & Interdisciplinary Goals)', multiline: true }),
        stats: fields.array(
          fields.object({
            label: fields.text({ label: 'Stat Label (e.g. Published Papers)' }),
            value: fields.text({ label: 'Stat Value (e.g. 5+)' }),
            detail: fields.text({ label: 'Detail / Subtitle' }),
          }),
          {
            label: 'Key Metric Counters',
            itemLabel: (props) => `${props.fields.label.value}: ${props.fields.value.value}`,
          }
        ),
      },
    }),
    researchInterests: singleton({
      label: 'Research Interests',
      path: 'src/content/research-interests/index',
      format: 'json',
      schema: {
        items: fields.array(
          fields.object({
            title: fields.text({ label: 'Title' }),
            tag: fields.text({ label: 'Category Tag (e.g. Climate Science, AI, Geospatial)' }),
            description: fields.text({ label: 'Short Description', multiline: true }),
            icon: fields.text({ label: 'Lucide Icon Name (e.g. CloudRain, Cpu, Globe, Activity, Database, Satellite)' }),
          }),
          {
            label: 'Interest Cards',
            itemLabel: (props) => props.fields.title.value || 'Interest Card',
          }
        ),
      },
    }),
    skills: singleton({
      label: 'Technical Skills Matrix',
      path: 'src/content/skills/index',
      format: 'json',
      schema: {
        programmingAndData: fields.array(fields.text({ label: 'Skill / Tool' }), {
          label: 'Programming & Data Analysis (Python, R, NumPy, pandas...)',
          itemLabel: (props) => props.value,
        }),
        machineLearning: fields.array(fields.text({ label: 'Skill / Framework' }), {
          label: 'Machine Learning & AI (Scikit-learn, PyTorch, TensorFlow...)',
          itemLabel: (props) => props.value,
        }),
        climateAnalysis: fields.array(fields.text({ label: 'Tool / Model' }), {
          label: 'Climate Data Analysis (CDO, NCO, NetCDF, ESMValTool, CMIP6...)',
          itemLabel: (props) => props.value,
        }),
        gisAndRemoteSensing: fields.array(fields.text({ label: 'GIS & RS Tool' }), {
          label: 'GIS, Remote Sensing & Earth Observation (ArcGIS, RGEE, terra, sf...)',
          itemLabel: (props) => props.value,
        }),
        systemsAndComputing: fields.array(fields.text({ label: 'Tool / OS' }), {
          label: 'Operating Systems & Computing (Linux, LPIC-1, Git/GitHub, Server Admin...)',
          itemLabel: (props) => props.value,
        }),
        statisticalSoftware: fields.array(fields.text({ label: 'Software' }), {
          label: 'Statistical Software (SPSS, Minitab, Excel...)',
          itemLabel: (props) => props.value,
        }),
      },
    }),
  },
  collections: {
    education: collection({
      label: 'Education',
      slugField: 'degreeSlug',
      path: 'src/content/education/*',
      format: 'json',
      schema: {
        degreeSlug: fields.slug({ name: { label: 'Slug' } }),
        degree: fields.text({ label: 'Degree Name (e.g. MSc in Climatology)' }),
        institution: fields.text({ label: 'Institution' }),
        location: fields.text({ label: 'Location' }),
        period: fields.text({ label: 'Period (e.g. 2022 – 2025)' }),
        gpa: fields.text({ label: 'GPA (e.g. 18.42/20)' }),
        rankBadge: fields.text({ label: 'Badge / Highlight (e.g. First-Rank Student)' }),
        thesis: fields.text({ label: 'Thesis Title / Details', multiline: true }),
        order: fields.integer({ label: 'Sort Order (smaller first)', defaultValue: 1 }),
      },
    }),
    publications: collection({
      label: 'Publications & Articles',
      slugField: 'slug',
      path: 'src/content/publications/*',
      format: 'json',
      schema: {
        slug: fields.slug({ name: { label: 'Slug / Short ID' } }),
        title: fields.text({ label: 'Publication Title' }),
        authors: fields.text({ label: 'Authors (leave empty if sole/primary author)' }),
        journal: fields.text({ label: 'Journal / Outlet' }),
        year: fields.text({ label: 'Year' }),
        type: fields.select({
          label: 'Publication Type',
          options: [
            { label: 'Research Article', value: 'Research Article' },
            { label: 'Technical Report', value: 'Technical Report' },
            { label: 'Submitted Article', value: 'Submitted Article' },
          ],
          defaultValue: 'Research Article',
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Published', value: 'Published' },
            { label: 'Under Review', value: 'Under Review' },
            { label: 'In Press', value: 'In Press' },
          ],
          defaultValue: 'Published',
        }),
        doiUrl: fields.text({ label: 'DOI or Paper Link' }),
        isHighlight: fields.checkbox({ label: 'Feature / Highlight on Homepage', defaultValue: false }),
        badge: fields.text({ label: 'Optional Badge (e.g. New Publish, High Impact)' }),
        abstract: fields.text({ label: 'Brief Summary / Abstract', multiline: true }),
        order: fields.integer({ label: 'Sort Order (smaller first)', defaultValue: 1 }),
      },
    }),
    experiences: collection({
      label: 'Work & Research Experiences',
      slugField: 'slug',
      path: 'src/content/experiences/*',
      format: 'json',
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        role: fields.text({ label: 'Role / Job Title' }),
        organization: fields.text({ label: 'Company / Organization' }),
        location: fields.text({ label: 'Location' }),
        period: fields.text({ label: 'Period' }),
        category: fields.select({
          label: 'Experience Category',
          options: [
            { label: 'Industry & Applied AI', value: 'Industry & Applied AI' },
            { label: 'Academic Research & Collaboration', value: 'Academic Research & Collaboration' },
            { label: 'Teaching & Mentorship', value: 'Teaching & Mentorship' },
            { label: 'Cartography & Geospatial', value: 'Cartography & Geospatial' },
            { label: 'Community Leadership', value: 'Community Leadership' },
          ],
          defaultValue: 'Industry & Applied AI',
        }),
        highlights: fields.array(fields.text({ label: 'Bullet point' }), {
          label: 'Key Achievements & Responsibilities',
          itemLabel: (props) => props.value,
        }),
        linkUrl: fields.text({ label: 'Reference / Project Link' }),
        linkLabel: fields.text({ label: 'Link Label' }),
        order: fields.integer({ label: 'Sort Order (smaller first)', defaultValue: 1 }),
      },
    }),
    awards: collection({
      label: 'Honors & Awards',
      slugField: 'slug',
      path: 'src/content/awards/*',
      format: 'json',
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        title: fields.text({ label: 'Award Title' }),
        institution: fields.text({ label: 'Conferring Institution' }),
        year: fields.text({ label: 'Year' }),
        badge: fields.text({ label: 'Badge (e.g. Rank 1, Top 1%, National)' }),
        details: fields.text({ label: 'Details', multiline: true }),
        order: fields.integer({ label: 'Sort Order', defaultValue: 1 }),
      },
    }),
    services: collection({
      label: 'Professional Service & Peer Review',
      slugField: 'slug',
      path: 'src/content/services/*',
      format: 'json',
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        role: fields.text({ label: 'Role (e.g. Expert Reviewer, Facilitator)' }),
        organization: fields.text({ label: 'Organization / Panel (e.g. IPCC AR7, CMIP Community)' }),
        date: fields.text({ label: 'Date / Term' }),
        badge: fields.text({ label: 'Badge' }),
        description: fields.text({ label: 'Description', multiline: true }),
        order: fields.integer({ label: 'Sort Order', defaultValue: 1 }),
      },
    }),
    certificates: collection({
      label: 'Certificates & Specialized Courses',
      slugField: 'slug',
      path: 'src/content/certificates/*',
      format: 'json',
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        title: fields.text({ label: 'Course / Certificate Title' }),
        provider: fields.text({ label: 'Issuer / Organization' }),
        date: fields.text({ label: 'Date / Completion Time' }),
        status: fields.text({ label: 'Status (e.g. Completed, In Progress)' }),
        category: fields.select({
          label: 'Field / Track',
          options: [
            { label: 'Climate & Earth Systems', value: 'Climate & Earth Systems' },
            { label: 'Remote Sensing & GIS', value: 'Remote Sensing & GIS' },
            { label: 'Machine Learning & Programming', value: 'Machine Learning & Programming' },
            { label: 'Systems & Computing', value: 'Systems & Computing' },
            { label: 'Sustainability & UN', value: 'Sustainability & UN' },
          ],
          defaultValue: 'Climate & Earth Systems',
        }),
        order: fields.integer({ label: 'Sort Order', defaultValue: 1 }),
      },
    }),
    community: collection({
      label: 'Community Service & Creative Endeavors',
      slugField: 'slug',
      path: 'src/content/community/*',
      format: 'json',
      schema: {
        slug: fields.slug({ name: { label: 'Slug' } }),
        title: fields.text({ label: 'Role / Project Title' }),
        organization: fields.text({ label: 'Organization / Initiative' }),
        period: fields.text({ label: 'Period' }),
        category: fields.select({
          label: 'Field',
          options: [
            { label: 'Origami & Paper Engineering', value: 'Origami & Paper Engineering' },
            { label: 'Astronomy & Science Outreach', value: 'Astronomy & Science Outreach' },
            { label: 'Library & Academic Service', value: 'Library & Academic Service' },
          ],
          defaultValue: 'Origami & Paper Engineering',
        }),
        highlights: fields.array(fields.text({ label: 'Bullet point' }), {
          label: 'Key Activities & Highlights',
          itemLabel: (props) => props.value,
        }),
        order: fields.integer({ label: 'Sort Order', defaultValue: 1 }),
      },
    }),
  },
});
