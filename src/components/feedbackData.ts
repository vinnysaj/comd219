export type FeedbackCategory = 'Speech Content' | 'Delivery' | 'Visual Aids';

export interface FeedbackEntry {
  author: string;
  role: 'Instructor' | 'Classmate';
  content: string;
  categories: FeedbackCategory[];
}

export interface ModuleFeedback {
  module: number;
  topic: string;
  feedback: FeedbackEntry[];
}

export const feedbackData: ModuleFeedback[] = [
  {
	module: 1,
	topic: 'Self Introduction Videos',
	feedback: [
	  {
		author: 'Linda Gibson',
		role: 'Instructor',
		content: 'Your video quality is excellent - great lighting, clear video, and good audio. Sounds like this course will be a nice asset for your work.',
		categories: ['Delivery', 'Visual Aids'],
	  },
	  {
		author: 'Kenneth Barefoot',
		role: 'Classmate',
		content: 'You seemed very calm and relaxed. Adjustable table and phone mount was a fantastic idea. Background landscape was great. Struggle with “Ums” and “Uhs” noted.',
		categories: ['Delivery', 'Visual Aids'],
	  },
	],
  },
  {
	module: 3,
	topic: 'Informative Presentation Topics',
	feedback: [
	  {
		author: 'Jorge',
		role: 'Classmate',
		content: 'Strong outline with good real-world examples. Consider mentioning how frameworks lower entry barriers for non-technical stakeholders.',
		categories: ['Speech Content'],
	  },
	],
  },
  {
	module: 4,
	topic: 'Informative Presentation Showcase',
	feedback: [
	  {
		author: 'Linda Gibson',
		role: 'Instructor',
		content: 'Good introduction and imagery. Smooth conclusion. Avoid explicitly mentioning upcoming story; integrate it more seamlessly.',
		categories: ['Speech Content', 'Delivery', 'Visual Aids'],
	  },
	  {
		author: 'Kenneth Barefoot',
		role: 'Classmate',
		content: 'Excellent introduction and voice modulation. Still some "umms" and "uhhs", recommend pausing to overcome these.',
		categories: ['Delivery'],
	  },
	],
  },
  {
	module: 5,
	topic: 'Visually Enhanced Presentations',
	feedback: [
	  {
		author: 'Aaron Soto',
		role: 'Classmate',
		content: 'Liked your SSR concept visualization idea. Consider before-and-after visuals for better understanding.',
		categories: ['Visual Aids'],
	  },
	  {
		author: 'Kenneth Barefoot',
		role: 'Classmate',
		content: 'Agree SSR visuals would be helpful. Curious about your approach for non-technical audiences.',
		categories: ['Visual Aids', 'Speech Content'],
	  },
	],
  },
  {
	module: 6,
	topic: 'Brainstorming Persuasive Topics',
	feedback: [
	  {
		author: 'Linda Gibson',
		role: 'Instructor',
		content: 'Topic on hot and cold therapy engaging and relatable. Suggest exploring cost-effective accessibility.',
		categories: ['Speech Content'],
	  },
	],
  },
  {
	module: 7,
	topic: 'Persuasive Presentation Outline',
	feedback: [
	  {
		author: 'Aiden Meshman',
		role: 'Classmate',
		content: 'Attention getter strong. Call to action could be more specific.',
		categories: ['Speech Content'],
	  },
	  {
		author: 'Kyle Usyk',
		role: 'Classmate',
		content: 'Good outline; consider adding muscle-specific targeting for soreness.',
		categories: ['Speech Content'],
	  },
	  {
		author: 'Andrew Brasfield',
		role: 'Classmate',
		content: 'Effective scientific and anecdotal combination, persuasive overall.',
		categories: ['Speech Content'],
	  },
	],
  },
  {
	module: 8,
	topic: 'Persuasive Presentation',
	feedback: [
	  {
		author: 'Linda Gibson',
		role: 'Instructor',
		content: 'Great visuals and verbal citations. Presentation short on time; include scientific detail and practical accessibility info.',
		categories: ['Speech Content', 'Visual Aids', 'Delivery'],
	  },
	  {
		author: 'Eduardo Rodriguez',
		role: 'Classmate',
		content: 'Excellent visual storytelling; slides simple and clear. Improve timing, expand content depth, and clarify call to action.',
		categories: ['Visual Aids', 'Delivery', 'Speech Content'],
	  },
	  {
		author: 'Kyle Usyk',
		role: 'Classmate',
		content: 'Slides visually appealing; short on time. Consider adding creative slide elements.',
		categories: ['Visual Aids', 'Delivery'],
	  },
	  {
		author: 'Jorge Lozano Andrade',
		role: 'Classmate',
		content: 'Great visuals and personal story. Expand accessibility details and scientific support to lengthen and enhance persuasiveness.',
		categories: ['Speech Content', 'Visual Aids', 'Delivery'],
	  },
	],
  },
];
