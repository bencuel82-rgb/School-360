import React, { useState, useEffect } from 'react';
import { collection, addDoc, serverTimestamp, query, orderBy, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Trash2, Upload, LogOut, Loader2, Image as ImageIcon, X } from 'lucide-react';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';
import { Link } from 'react-router-dom';

interface Photo {
  id: string;
  url: string;
  caption: string;
  createdAt: any;
}

export default function Admin() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loadingPhotos, setLoadingPhotos] = useState(true);
  const [photoToDelete, setPhotoToDelete] = useState<string | null>(null);

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin360';
  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;
  const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    if (!isAuthenticated) return;

    const path = 'photos';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const photoData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Photo[];
      setPhotos(photoData);
      setLoadingPhotos(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, path, auth);
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Incorrect password');
    }
  };

  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);

    try {
      // 1. Upload to Cloudinary
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', UPLOAD_PRESET || '');

      const response = await fetch(CLOUDINARY_URL, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Cloudinary upload failed');
      const data = await response.json();

      // 2. Save to Firestore
      const path = 'photos';
      try {
        await addDoc(collection(db, path), {
          url: data.secure_url,
          caption: caption || '',
          createdAt: serverTimestamp(),
        });
      } catch (dbError) {
        handleFirestoreError(dbError, OperationType.WRITE, path, auth);
      }

      // Reset form
      setFile(null);
      setCaption('');
      const input = document.getElementById('photo-upload') as HTMLInputElement;
      if (input) input.value = '';

    } catch (error: any) {
      console.error('Upload error:', error);
      // If it's a Firestore error we already handled it, otherwise show alert
      if (!error.message?.includes('operationType')) {
        alert('Failed to upload image. Please check Cloudinary configuration.');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (photoId: string) => {
    try {
      const photoRef = doc(db, 'photos', photoId);
      await deleteDoc(photoRef);
      console.log('Document successfully deleted!');
      setPhotoToDelete(null); // Close modal on success
    } catch (error: any) {
      console.error('Delete error:', error);
      const path = `photos/${photoId}`;
      alert(`Deletion failed: ${error.message || 'Unknown error'}`);
      handleFirestoreError(error, OperationType.DELETE, path, auth);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md relative">
          <Link 
            to="/" 
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="Cancel and return home"
          >
            <X size={24} />
          </Link>
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white">
              <LogOut size={32} />
            </div>
          </div>
          <h1 className="text-3xl font-serif font-black text-center text-[#0A192F] mb-8">Admin Access</h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-black uppercase tracking-widest text-slate-500 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:outline-none transition-colors"
                placeholder="Enter admin password"
                required
              />
              {loginError && <p className="text-red-500 text-sm mt-2 font-bold">{loginError}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-[#0A192F] text-amber-400 py-4 rounded-xl font-bold hover:bg-orange-600 hover:text-white transition-all active:scale-95"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFBF7] p-6 lg:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-[#0A192F]">Gallery <span className="text-orange-500 italic">Control Room</span></h1>
            <p className="text-slate-500 font-medium">Manage images for 'Our School Life' section</p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-600 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Upload Form */}
          <div className="lg:col-span-4">
            <div className="bg-white p-8 rounded-[32px] shadow-xl border border-orange-100 sticky top-12">
              <h2 className="text-2xl font-serif font-black text-[#0A192F] mb-6 flex items-center gap-2">
                <Upload size={24} className="text-orange-500" /> Upload New
              </h2>
              <form onSubmit={handleFileUpload} className="space-y-6">
                <div className="relative group">
                  <input
                    type="file"
                    id="photo-upload"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="hidden"
                    required
                  />
                  <label
                    htmlFor="photo-upload"
                    className="flex flex-col items-center justify-center p-12 border-4 border-dashed border-slate-100 rounded-[24px] cursor-pointer group-hover:border-orange-200 group-hover:bg-orange-50/30 transition-all"
                  >
                    {file ? (
                      <div className="text-center">
                        <ImageIcon className="mx-auto text-green-500 mb-2" size={40} />
                        <p className="text-sm font-bold text-slate-700 truncate max-w-[200px]">{file.name}</p>
                      </div>
                    ) : (
                      <div className="text-center">
                        <Upload className="mx-auto text-slate-300 mb-2" size={40} />
                        <p className="text-sm font-bold text-slate-400">Select Image</p>
                      </div>
                    )}
                  </label>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Caption (Optional)</label>
                  <textarea
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    className="w-full px-6 py-4 rounded-xl border-2 border-slate-100 focus:border-orange-500 focus:outline-none transition-colors h-24 resize-none"
                    placeholder="Enter a beautiful caption..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={uploading || !file}
                  className="w-full bg-orange-500 text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-3 disabled:opacity-50 shadow-xl shadow-orange-100 hover:bg-[#0A192F] transition-all"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="animate-spin" /> Uploading to Cloud...
                    </>
                  ) : (
                    <>
                      <Upload size={20} /> Publish to Gallery
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Photos Grid */}
          <div className="lg:col-span-8">
            <h2 className="text-2xl font-serif font-black text-[#0A192F] mb-6 flex items-center gap-2">
               Live Gallery <span className="text-sm font-bold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">{photos.length} Photos</span>
            </h2>
            
            {loadingPhotos ? (
              <div className="flex justify-center py-20">
                <Loader2 className="animate-spin text-orange-500" size={40} />
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {photos.map((photo) => (
                  <div key={photo.id} className="group relative aspect-square rounded-[32px] overflow-hidden bg-white shadow-lg border border-slate-100">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-6">
                      <button
                        onClick={() => setPhotoToDelete(photo.id)}
                        className="self-end p-3 bg-red-500 text-white rounded-2xl hover:scale-110 transition-transform shadow-xl"
                        title="Delete Photo"
                      >
                        <Trash2 size={20} />
                      </button>
                      <p className="text-white font-medium italic">"{photo.caption || 'No caption'}"</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loadingPhotos && photos.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-100">
                <ImageIcon className="mx-auto text-slate-200 mb-4" size={64} />
                <p className="text-slate-400 font-bold italic">Gallery is currently empty.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {photoToDelete && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#0A192F]/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-[40px] shadow-2xl max-w-sm w-full text-center animate-in zoom-in-95 duration-300">
            <div className="w-20 h-20 bg-red-50 rounded-[24px] flex items-center justify-center text-red-500 mx-auto mb-6">
              <Trash2 size={40} />
            </div>
            <h3 className="text-2xl font-serif font-black text-[#0A192F] mb-2">Delete Photo?</h3>
            <p className="text-slate-500 mb-8 font-medium">This action cannot be undone. Are you absolutely sure?</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleDelete(photoToDelete)}
                className="w-full bg-red-500 text-white py-4 rounded-2xl font-bold hover:bg-red-600 transition-all active:scale-95"
              >
                Yes, Delete it
              </button>
              <button
                onClick={() => setPhotoToDelete(null)}
                className="w-full bg-slate-100 text-slate-500 py-4 rounded-2xl font-bold hover:bg-slate-200 transition-all active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
