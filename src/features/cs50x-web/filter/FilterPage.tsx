import React, { useRef, useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Divider from '@mui/joy/Divider';
import Grid from '@mui/joy/Grid';
import Alert from '@mui/joy/Alert';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import InvertColorsIcon from '@mui/icons-material/InvertColors';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import FlipIcon from '@mui/icons-material/Flip';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus';

type FilterType = 'grayscale' | 'sepia' | 'reflect' | 'blur' | 'edges' | 'original';

export function FilterPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<FilterType>('original');
  const [isProcessing, setIsProcessing] = useState(false);
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null);

  // Load the image when selected
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
        setActiveFilter('original');
      };
      reader.readAsDataURL(file);
    }
  };

  // Draw initial image to canvas and save original data
  useEffect(() => {
    if (!imageSrc || !canvasRef.current) return;

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;

      // Scale down super large images to prevent locking the browser thread too long
      const MAX_WIDTH = 800;
      let width = img.width;
      let height = img.height;
      if (width > MAX_WIDTH) {
          height = Math.round(height * (MAX_WIDTH / width));
          width = MAX_WIDTH;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      
      const imgData = ctx.getImageData(0, 0, width, height);
      setOriginalImageData(imgData);
    };
    img.src = imageSrc;
  }, [imageSrc]);

  // Apply filters mimicking CS50 C functions
  const applyFilter = (filterType: FilterType) => {
    if (!originalImageData || !canvasRef.current) return;
    
    setIsProcessing(true);
    setActiveFilter(filterType);

    setTimeout(() => {
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext('2d')!;
        const width = canvas.width;
        const height = canvas.height;
        
        // Always start from original data to prevent compounded filters
        const newImgData = new ImageData(
            new Uint8ClampedArray(originalImageData.data),
            width,
            height
        );
        const data = newImgData.data;

        if (filterType === 'grayscale') {
            for (let i = 0; i < data.length; i += 4) {
                const avg = Math.round((data[i] + data[i + 1] + data[i + 2]) / 3);
                data[i] = avg;
                data[i + 1] = avg;
                data[i + 2] = avg;
            }
        } 
        else if (filterType === 'sepia') {
            for (let i = 0; i < data.length; i += 4) {
                const r = data[i];
                const g = data[i + 1];
                const b = data[i + 2];
                data[i] = Math.min(255, Math.round(0.393 * r + 0.769 * g + 0.189 * b));
                data[i+1] = Math.min(255, Math.round(0.349 * r + 0.686 * g + 0.168 * b));
                data[i+2] = Math.min(255, Math.round(0.272 * r + 0.534 * g + 0.131 * b));
            }
        }
        else if (filterType === 'reflect') {
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < Math.floor(width / 2); x++) {
                    const leftIdx = (y * width + x) * 4;
                    const rightIdx = (y * width + (width - 1 - x)) * 4;
                    for (let k = 0; k < 3; k++) {
                        const temp = data[leftIdx + k];
                        data[leftIdx + k] = data[rightIdx + k];
                        data[rightIdx + k] = temp;
                    }
                }
            }
        }
        else if (filterType === 'blur') {
            // Need a snapshot to read from so we don't read modified data
            const copy = new Uint8ClampedArray(data);
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let sumR = 0, sumG = 0, sumB = 0;
                    let count = 0;
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const ny = y + dy;
                            const nx = x + dx;
                            if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
                                const idx = (ny * width + nx) * 4;
                                sumR += copy[idx];
                                sumG += copy[idx + 1];
                                sumB += copy[idx + 2];
                                count++;
                            }
                        }
                    }
                    const writeIdx = (y * width + x) * 4;
                    data[writeIdx] = Math.round(sumR / count);
                    data[writeIdx + 1] = Math.round(sumG / count);
                    data[writeIdx + 2] = Math.round(sumB / count);
                }
            }
        }
        else if (filterType === 'edges') {
            const copy = new Uint8ClampedArray(data);
            const gxList = [[-1, 0, 1], [-2, 0, 2], [-1, 0, 1]];
            const gyList = [[-1, -2, -1], [0, 0, 0], [1, 2, 1]];

            // Convert to grayscale first for easier Sobel mapping (matches some CS50 variants logic)
            // Note: CS50 Edges computes RGB sobel separately.
            for (let y = 0; y < height; y++) {
                for (let x = 0; x < width; x++) {
                    let rx = 0, gx = 0, bx = 0;
                    let ry = 0, gy = 0, by = 0;
                    
                    for (let dy = -1; dy <= 1; dy++) {
                        for (let dx = -1; dx <= 1; dx++) {
                            const ny = y + dy;
                            const nx = x + dx;
                            
                            if (ny >= 0 && ny < height && nx >= 0 && nx < width) {
                                const idx = (ny * width + nx) * 4;
                                const gxW = gxList[dy + 1][dx + 1];
                                const gyW = gyList[dy + 1][dx + 1];
                                
                                rx += copy[idx] * gxW;
                                gx += copy[idx + 1] * gxW;
                                bx += copy[idx + 2] * gxW;
                                
                                ry += copy[idx] * gyW;
                                gy += copy[idx + 1] * gyW;
                                by += copy[idx + 2] * gyW;
                            }
                        }
                    }
                    
                    const writeIdx = (y * width + x) * 4;
                    data[writeIdx] = Math.min(255, Math.round(Math.sqrt(rx * rx + ry * ry)));
                    data[writeIdx + 1] = Math.min(255, Math.round(Math.sqrt(gx * gx + gy * gy)));
                    data[writeIdx + 2] = Math.min(255, Math.round(Math.sqrt(bx * bx + by * by)));
                }
            }
        }

        ctx.putImageData(newImgData, 0, 0);
        setIsProcessing(false);
    }, 50); // Give UI time to update loading state
  };

  return (
    <Box 
      sx={{ 
        p: { xs: 2, sm: 4, md: 6 }, 
        maxWidth: '1000px', 
        mx: 'auto',
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography level="h1" sx={{ mb: 2, fontWeight: 800, letterSpacing: "-0.02em" }}>
          CS50x: Filter
        </Typography>
        <Typography level="body-lg" sx={{ color: "text.secondary", maxWidth: "700px", mx: "auto" }}>
          A digital translation of the CS50 Filter program. 
          Upload an image to dynamically run C-style bitwise array manipulation in the browser via Canvas API!
        </Typography>
      </Box>

      <Grid container spacing={4}>
        <Grid xs={12} md={3}>
            <Card variant="outlined" sx={{ bgcolor: "background.surface", borderRadius: "xl", position: 'sticky', top: '100px' }}>
                <CardContent>
                    <Typography level="title-md" sx={{ mb: 2 }}>Controls</Typography>

                    <Button 
                        component="label" 
                        variant="soft" 
                        color="primary" 
                        fullWidth 
                        startDecorator={<PhotoCameraIcon />}
                        sx={{ mb: 3 }}
                    >
                        Upload Image
                        <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
                    </Button>

                    <Divider sx={{ mb: 3 }} />

                    <Stack spacing={1.5}>
                        <Button 
                            variant={activeFilter === 'original' ? 'solid' : 'outlined'} 
                            color="neutral" 
                            onClick={() => applyFilter('original')}
                            disabled={!imageSrc || isProcessing}
                        >
                            Original
                        </Button>
                        <Button 
                            variant={activeFilter === 'grayscale' ? 'solid' : 'outlined'} 
                            color="neutral" 
                            startDecorator={<InvertColorsIcon />} 
                            onClick={() => applyFilter('grayscale')}
                            disabled={!imageSrc || isProcessing}
                        >
                            Grayscale
                        </Button>
                        <Button 
                            variant={activeFilter === 'sepia' ? 'solid' : 'outlined'} 
                            color="warning" 
                            startDecorator={<SettingsBrightnessIcon />} 
                            onClick={() => applyFilter('sepia')}
                            disabled={!imageSrc || isProcessing}
                        >
                            Sepia
                        </Button>
                        <Button 
                            variant={activeFilter === 'reflect' ? 'solid' : 'outlined'} 
                            color="primary" 
                            startDecorator={<FlipIcon />} 
                            onClick={() => applyFilter('reflect')}
                            disabled={!imageSrc || isProcessing}
                        >
                            Reflect
                        </Button>
                        <Button 
                            variant={activeFilter === 'blur' ? 'solid' : 'outlined'} 
                            color="success" 
                            startDecorator={<BlurOnIcon />} 
                            onClick={() => applyFilter('blur')}
                            disabled={!imageSrc || isProcessing}
                        >
                            Blur (Box)
                        </Button>
                        <Button 
                            variant={activeFilter === 'edges' ? 'solid' : 'outlined'} 
                            color="danger" 
                            startDecorator={<FilterCenterFocusIcon />} 
                            onClick={() => applyFilter('edges')}
                            disabled={!imageSrc || isProcessing}
                        >
                            Edges (Sobel)
                        </Button>
                    </Stack>
                </CardContent>
            </Card>
        </Grid>

        <Grid xs={12} md={9}>
            <Card variant="outlined" sx={{ minHeight: '400px', display: 'flex', alignItems: 'center', justifyItems: 'center', bgcolor: "neutral.900", borderRadius: "xl", overflow: 'hidden' }}>
                {!imageSrc ? (
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', opacity: 0.5 }}>
                        <PhotoCameraIcon sx={{ fontSize: 64, mb: 2 }} />
                        <Typography level="title-lg">No Image Selected</Typography>
                        <Typography level="body-sm">Upload a photo to see the filters in action.</Typography>
                    </Box>
                ) : (
                    <Box sx={{ position: 'relative', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', p: 2 }}>
                        {isProcessing && (
                            <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.6)', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography level="h3" textColor="common.white">Applying Kernel...</Typography>
                            </Box>
                        )}
                        <canvas 
                            ref={canvasRef} 
                            style={{ 
                                maxWidth: '100%', 
                                maxHeight: '70vh', 
                                objectFit: 'contain',
                                borderRadius: '8px',
                                boxShadow: '0px 8px 32px rgba(0,0,0,0.4)',
                                background: 'transparent'
                            }} 
                        />
                    </Box>
                )}
            </Card>
            
            {imageSrc && !isProcessing && activeFilter !== 'original' && (
                <Alert 
                    variant="soft" 
                    color="success" 
                    sx={{ mt: 3, justifyContent: 'center' }}
                    startDecorator={<CheckCircleIcon />}
                >
                    Successfully applied {activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)} filter!
                </Alert>
            )}
        </Grid>
      </Grid>
    </Box>
  );
}
