import { asset } from '../../lib/assets'
import { DemoCardLink } from '../ui/DemoCard'
import { Button } from '../ui/Button'

interface Connect4DemoCardProps {
    onPlay: () => void
}

export function Connect4DemoCard({ onPlay }: Connect4DemoCardProps) {
    return (
        <DemoCardLink
            href="https://github.com/Halyconer/ConnectX"
            target="_blank"
            rel="noopener"
        >
            <div>
                <h3 className="text-slate-dark text-[1.8rem] font-semibold m-0 mb-0.5">
                    Challenge My AI
                </h3>
                <p className="text-primary text-[0.95rem] font-medium m-0 mb-0.5">
                    Try to beat my Connect 4 algorithm
                </p>
            </div>
            <p className="text-slate-muted text-[0.9rem] leading-snug m-0 mb-1 text-justify max-sm:text-left">
                It&apos;s on medium difficulty right now, but it&apos;s still
                pretty good. Currently using a minimax algorithm; my next step
                is to train a neural network with optimal scoring weights so lmk
                if you can help.
            </p>
            <div>
                <div className="mb-3 rounded-lg overflow-hidden max-h-[150px] flex items-center justify-center">
                    <img
                        src={asset('connect4.jpg')}
                        alt="Connect 4 Game"
                        className="w-full h-auto max-h-[150px] object-contain rounded-lg"
                    />
                </div>
                <Button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onPlay()
                    }}
                >
                    ZIP
                </Button>
            </div>
        </DemoCardLink>
    )
}
