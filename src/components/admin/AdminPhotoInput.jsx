import { useEffect, useId, useRef, useState } from 'react'

export default function AdminPhotoInput({ value, onChange, label = 'Fotografía' }) {
  const id = useId()
  const reader = useRef(null)
  const [error, setError] = useState('')
  useEffect(() => () => { reader.current?.abort() }, [])

  function selectPhoto(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
      setError('Elegí una imagen JPG, PNG o WebP de hasta 5 MB.'); return
    }
    reader.current?.abort()
    const fileReader = new FileReader()
    reader.current = fileReader
    fileReader.onload = () => { onChange(String(fileReader.result)); setError('') }
    fileReader.onerror = () => setError('No pudimos leer la imagen. Probá con otra.')
    fileReader.readAsDataURL(file)
  }

  return <div className="admin-photo-input"><span className="admin-label">{label}</span><div className="admin-photo-controls">{value ? <img src={value} alt="Vista previa de la fotografía seleccionada" /> : <span className="admin-photo-placeholder" aria-hidden="true">＋</span>}<div><label className="admin-button admin-button--secondary" htmlFor={`${id}-camera`}>{value ? 'Repetir foto' : 'Tomar foto'}</label><input className="admin-file-input" id={`${id}-camera`} type="file" accept="image/jpeg,image/png,image/webp" capture="environment" onChange={selectPhoto} /><label className="admin-button admin-button--secondary" htmlFor={`${id}-gallery`}>{value ? 'Reemplazar imagen' : 'Elegir de galería'}</label><input className="admin-file-input" id={`${id}-gallery`} type="file" accept="image/jpeg,image/png,image/webp" onChange={selectPhoto} />{value && <button type="button" className="admin-text-button" onClick={() => { reader.current?.abort(); onChange('') }}>Quitar imagen</button>}</div></div><small className="admin-muted">Imagen local y temporal. JPG, PNG o WebP, hasta 5 MB. En móviles compatibles, “Tomar foto” abre la cámara; en otros equipos se abre el selector de archivos.</small>{error && <p className="admin-error" role="alert">{error}</p>}</div>
}
