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
            <p className="text-[0.68rem] text-muted/40 font-inter tracking-[0.1em] mb-4">02</p>
            <div className="mb-4">
                <h3 className="text-heading text-[1.3rem] font-normal font-poly m-0 mb-1">
                    Challenge My AI
                </h3>
                <p className="text-muted text-[0.8rem] font-inter m-0">
                    Try to beat my Connect 4 algorithm
                </p>
            </div>
            <p className="text-muted text-[0.85rem] font-inter leading-relaxed m-0 mb-4">
                Minimax at medium difficulty — still pretty hard to beat.
                Training a neural network with optimal scoring weights is the
                next step.
            </p>
            <div>
                <div className="mb-4 overflow-hidden max-h-[130px] flex items-center justify-center border border-border">
                    <img
                        src={asset('connect4.jpg')}
                        alt="Connect 4 Game"
                        className="w-full h-auto max-h-[130px] object-contain"
                    />
                </div>
                <Button
                    onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        onPlay()
                    }}
                >
                    Play
                </Button>
            </div>
        </DemoCardLink>
    )
}
