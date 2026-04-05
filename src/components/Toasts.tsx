import { useStore } from '@/context/StoreContext';

const Toasts = () => {
  const { toasts } = useStore();
  const borderColors = { success: 'hsl(142,71%,45%)', error: 'hsl(0,84%,60%)', info: 'hsl(187,100%,50%)' };
  const icons = { success: 'fa-circle-check', error: 'fa-circle-xmark', info: 'fa-circle-info' };

  return (
    <div className="fixed bottom-6 right-6 z-[99000] flex flex-col gap-3">
      {toasts.map(t => (
        <div key={t.id} className="flex items-center gap-3 rounded-lg px-5 py-3.5 min-w-[280px] max-w-[360px] shadow-2xl" style={{ backgroundColor: 'hsl(0,0%,6.7%)', borderLeft: `4px solid ${borderColors[t.type]}`, animation: 'toastIn 0.3s ease forwards' }}>
          <i className={`fa-solid ${icons[t.type]}`} style={{ color: borderColors[t.type] }} />
          <span className="text-sm font-body">{t.message}</span>
        </div>
      ))}
    </div>
  );
};

export default Toasts;
