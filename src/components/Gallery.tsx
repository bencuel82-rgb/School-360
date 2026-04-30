import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { motion } from 'motion/react';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

interface Photo {
  id: string;
  url: string;
  caption: string;
  createdAt: any;
}

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = 'photos';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const photoData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Photo[];
      setPhotos(photoData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, path, auth);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <section className="py-24 bg-white" id="gallery">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-[#0A192F] mb-4">
            Our <span className="text-orange-500 italic">School Life</span>
          </h2>
          <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Capturing the moments of joy, discovery, and growth at School 360°.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative aspect-square rounded-[32px] overflow-hidden bg-slate-100 shadow-xl"
            >
              <img
                src={photo.url}
                alt={photo.caption || 'School life photo'}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              {photo.caption && (
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent flex flex-col justify-end p-8 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white font-medium text-lg italic">"{photo.caption}"</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {photos.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[48px] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-bold italic">No photos shared yet. Check back soon!</p>
          </div>
        )}
      </div>
    </section>
  );
}
