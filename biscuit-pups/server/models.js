import mongoose from 'mongoose';
const { Schema, model } = mongoose;

// Who took the photo. Picsum serves Unsplash photos, so credit both.
const credit = new Schema({
  author: String, sourceUrl: String,
  via: { type: String, default: 'Picsum Photos' },
  license: { type: String, default: 'Unsplash License' },
  verified: { type: Boolean, default: false },       // false = couldn't reach Picsum to look the photographer up
}, { _id: false });

const puppy = new Schema({
  slug:      { type: String, required: true, unique: true },
  name:      { type: String, required: true, trim: true },
  breeds:    { type: [String], index: true },            // maltipoo | pomeranian | poodle | cavapoo | shih-tzu
  gender:    { type: String, enum: ['boy', 'girl', 'both'], required: true },
  ageLabel:  String,                                      // "3 months Maltipoo & 2 months Cavapoo"
  ageMonths: Number,
  hasVideo:  { type: Boolean, default: false },
  origin:    { type: String, enum: ['local', 'imported'], default: 'local', index: true },
  status:    { type: String, enum: ['available', 'reserved', 'gone-home'], default: 'available', index: true },
  image:     String,                                      // optional real photo URL; falls back to illustration
  alt:       String,
  credit:    credit,
  fur: String, ear: String, muzzle: String, patch: String, bg: String,   // illustration palette
  ears:      { type: String, enum: ['floppy', 'perky'], default: 'floppy' },
  order:     { type: Number, default: 0 },
}, { timestamps: true });

const family = new Schema({
  caption: String, image: String, alt: String, credit: credit, order: { type: Number, default: 0 },
  fur: String, ear: String, muzzle: String, patch: String, bg: String, ears: String,
});

// Library of every photo pushed to the database, with its credit.
const image = new Schema({
  url:        { type: String, required: true },
  picsumId:   String, width: Number, height: Number, grayscale: Boolean,
  alt:        String,
  credit:     credit,
  assignedTo: { type: String, default: null },       // "puppy:max" | "family:3" | null
  isDefault:  { type: Boolean, default: false },     // came from data/images.json
}, { timestamps: true });
image.index({ url: 1, assignedTo: 1 }, { unique: true });

const faq = new Schema({
  question: { type: String, required: true }, answer: { type: String, required: true }, order: { type: Number, default: 0 },
});

const testimonial = new Schema({ quote: String, author: String, location: String });

const enquiry = new Schema({
  name:       { type: String, required: true, trim: true, maxlength: 80 },
  phone:      { type: String, trim: true, maxlength: 30 },
  city:       { type: String, trim: true, maxlength: 60 },
  email:      { type: String, trim: true, lowercase: true, maxlength: 120 },
  message:    { type: String, required: true, trim: true, maxlength: 1000 },
  puppySlug:  String,
  status:     { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
}, { timestamps: true });

export const Puppy = model('Puppy', puppy);
export const Family = model('Family', family);
export const Image = model('Image', image);
export const Faq = model('Faq', faq);
export const Testimonial = model('Testimonial', testimonial);
export const Enquiry = model('Enquiry', enquiry);
