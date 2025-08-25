import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';

export type ImagePickerHandle = {
  openCamera: () => Promise<void>;
  openFileDialog: () => void;
};

type Props = {
  onChange: (file: File | null) => void;
};

const ImagePicker = React.forwardRef<ImagePickerHandle, Props>(({ onChange }, ref) => {
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setShowCamera(true);
    } catch (e) {
      alert('Camera not available or permission denied. You can upload from gallery instead.');
    }
  };

  const capture = async () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const blob: Blob | null = await new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', 0.9));
    if (!blob) return;
    const file = new File([blob], `capture_${Date.now()}.jpg`, { type: 'image/jpeg' });
    const url = URL.createObjectURL(blob);
    setPreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return url; });
    onChange(file);
    closeCamera();
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
  };

  const onPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files && e.target.files[0];
    if (f) {
      setPreviewUrl((prev) => { if (prev) URL.revokeObjectURL(prev); return URL.createObjectURL(f); });
      onChange(f);
    }
  };

  useImperativeHandle(ref, () => ({
    openCamera,
    openFileDialog: () => fileInputRef.current?.click(),
  }));

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        style={{ display: 'none' }}
        onChange={onPick}
      />

      {showCamera ? (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'grid', placeItems: 'center', zIndex: 50 }}>
          <div style={{ background: 'var(--card-bg)', padding: 12, borderRadius: 8, width: 'min(96vw, 520px)', boxShadow: 'var(--shadow)' }}>
            <div className="section-title">Camera</div>
            <div style={{ position: 'relative', width: '100%', background: '#000', borderRadius: 6, overflow: 'hidden' }}>
              <video ref={videoRef} style={{ width: '100%', height: 'auto' }} playsInline muted />
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, justifyContent: 'flex-end' }}>
              <button type="button" className="button secondary" onClick={closeCamera}>Cancel</button>
              <button type="button" className="button" onClick={capture}>Capture</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
});

export default ImagePicker; 