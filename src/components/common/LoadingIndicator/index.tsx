import { Box, CircularProgress } from '@mui/material';

export default function LoadingIndicator() {
  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] w-full items-center justify-center bg-gray-400 bg-opacity-30">
      <CircularProgress sx={{ color: '#5C068C' }} />
    </div>
  );
}
