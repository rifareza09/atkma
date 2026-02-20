type LogoProps = {
    className?: string;
    size?: number;
};

export default function MahkamahAgungLogo({ className = '', size = 48 }: LogoProps) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
        >
            {/* Shield Background */}
            <path
                d="M50 5 L85 20 L85 50 C85 70, 70 85, 50 95 C30 85, 15 70, 15 50 L15 20 Z"
                fill="#D4AF37"
                stroke="#8B7355"
                strokeWidth="2"
            />
            
            {/* Inner Shield */}
            <path
                d="M50 15 L75 25 L75 45 C75 60, 65 72, 50 80 C35 72, 25 60, 25 45 L25 25 Z"
                fill="#FFFFFF"
                stroke="#D4AF37"
                strokeWidth="1.5"
            />
            
            {/* Garuda Eagle Wings - Simplified */}
            <ellipse cx="50" cy="45" rx="15" ry="12" fill="#8B4513" />
            
            {/* Eagle Head */}
            <circle cx="50" cy="35" r="5" fill="#8B4513" />
            <path d="M47 33 L49 35 L47 35 Z" fill="#FFD700" />
            
            {/* Wings */}
            <path d="M35 42 Q30 45 35 48 L45 45 Z" fill="#8B4513" />
            <path d="M65 42 Q70 45 65 48 L55 45 Z" fill="#8B4513" />
            
            {/* Tail Feathers */}
            <path d="M50 55 L45 62 L50 60 L55 62 Z" fill="#8B4513" />
            
            {/* Star Symbol (Pancasila) */}
            <path
                d="M50 22 L51.5 26.5 L56 26.5 L52.5 29 L54 33.5 L50 31 L46 33.5 L47.5 29 L44 26.5 L48.5 26.5 Z"
                fill="#FFD700"
                stroke="#8B4513"
                strokeWidth="0.5"
            />
            
            {/* Scales of Justice (Bottom) */}
            <rect x="48" y="58" width="4" height="10" fill="#8B4513" />
            <circle cx="42" cy="70" r="5" fill="none" stroke="#8B4513" strokeWidth="1.5" />
            <circle cx="58" cy="70" r="5" fill="none" stroke="#8B4513" strokeWidth="1.5" />
            <path d="M42 66 L50 63 L58 66" stroke="#8B4513" strokeWidth="1.5" fill="none" />
        </svg>
    );
}
