interface ColumnResizeHandleProps {
  startWidth: number
  minWidth: number
  onResize: (nextWidth: number) => void
  onResizeStateChange: (isResizing: boolean) => void
}

function ColumnResizeHandle({
  startWidth,
  minWidth,
  onResize,
  onResizeStateChange,
}: ColumnResizeHandleProps) {
  return (
    <div
      className="absolute -right-1 top-0 h-full w-2 cursor-col-resize"
      onMouseDown={(event) => {
        event.preventDefault()
        event.stopPropagation()
        onResizeStateChange(true)

        const startX = event.clientX

        const handleMouseMove = (moveEvent: MouseEvent) => {
          const delta = moveEvent.clientX - startX
          const nextWidth = Math.max(minWidth, startWidth + delta)
          onResize(nextWidth)
        }

        const handleMouseUp = () => {
          window.removeEventListener('mousemove', handleMouseMove)
          window.removeEventListener('mouseup', handleMouseUp)
          window.setTimeout(() => {
            onResizeStateChange(false)
          }, 0)
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
      }}
      onClick={(event) => event.stopPropagation()}
      aria-hidden="true"
    />
  )
}

export default ColumnResizeHandle
