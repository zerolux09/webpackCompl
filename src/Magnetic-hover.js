    // --------------------------------------------------
    // Animation on Magnetic hover
    // --------------------------------------------------
    class MagneticCursor {
        constructor() {
            this.links = [...document.querySelectorAll('.c-magnetic')]
            this.pos = {
                x: 0,
                y: 0
            }
        }

        activateMagnetic() {
            this.links.map(link => {
                const that = this
                link.addEventListener('mousemove', function(e) {
                    that.moveTarget(e, this, this.querySelector('.span'), 20)
                })

                link.addEventListener('mouseout', function() {
                    TweenMax.to(this.querySelector('.span'), 0.3, {
                        x: 0,
                        y: 0
                    })
                })
            })
        }


        moveTarget(e, link, span, force) {
            const boundingRect = link.getBoundingClientRect()
            const relX = e.pageX - boundingRect.left
            const relY = '100px'

            TweenMax.to(span, 0.3, {
                x: (relX - boundingRect.width / 2) / boundingRect.width * force,
                y: (relY - boundingRect.height / 2)/boundingRect.height * force,
                ease: Power2.easeOut
            })
        }

        render() {
            this.activateMagnetic()
        }
    }

    const magneticCursor = new MagneticCursor()

    magneticCursor.render()
